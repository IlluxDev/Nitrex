import { ElectronNitrexOptions } from "./ElectronNitrexOptions";
import deepmerge from "deepmerge";
import { app, BrowserWindow, BrowserWindowConstructorOptions, dialog, ipcMain } from "electron";
import electronIsDev from "electron-is-dev";
import path from "path";
import { Window } from "./events/Window";
import { WindowOnTitleUpdateMessage } from "./events/WindowOnTitleUpdateMessage";

export class ElectronNitrex {
    private settings: ElectronNitrexOptions;
    private electronAppReady: boolean;
    private started = false;
    private browserWindow?: BrowserWindow;
    private currentTitle = "";
    private events = {
        ready: [] as any[],
        command: [] as any[]
    };

    public constructor(options: ElectronNitrexOptions) {
        this.electronAppReady = app.isReady();

        if (!this.electronAppReady) {
            app.on("ready", () => this.electronAppReady = true);
        }

        this.settings = deepmerge<ElectronNitrexOptions>({
            browserWindowOptions: {
                frame: false,
                show: false,
                webPreferences: {
                    nodeIntegration: true,
                    contextIsolation: false,
                    webSecurity: false,
                    webviewTag: true
                }
            },
            width: 1200,
            height: 800,
            title: "Nitrex App",
            icon: null
        }, options);

        this.currentTitle = this.settings.title!;
    }

    public log(debugText: string) {
        console.log("[_atron][debug][log]-" + debugText);
    }

    public start() {
        if (this.started) {
            throw new Error("Cannot start application multiple times");
        }

        this.started = true;

        const onceElectronAppReady = () => {
            this.browserWindow = new BrowserWindow(deepmerge<BrowserWindowConstructorOptions>({
                title: this.settings.title,
                width: this.settings.width,
                height: this.settings.height,
                icon: this.settings.icon ?? path.join(__dirname, "assets/DefaultIcon.png")
            }, this.settings.browserWindowOptions!));

            const onWindowLoad = () => {
                this.browserWindow!.show();
                this.events.ready.forEach(event => event());
            }

            this.registerInternalEvents();

            if (electronIsDev) {
                this.browserWindow.loadURL("http://localhost:3000").then(() => {
                    onWindowLoad();
                    console.log("[_atron][window]-ready");

                    this.browserWindow?.on("close", () => {
                        console.log("[_atron][app]-stop");
                    });
                });
            } else {
                this.browserWindow.loadFile(path.join(this.settings.projectRoot, "dist/renderer/index.html")).then(() => {
                    onWindowLoad();
                }).catch(() => {
                    dialog.showErrorBox("Failed to start", "Could not find renderer view");
                    app.exit(0);
                });
            }
        }

        if (!this.electronAppReady) {
            app.on("ready", () => onceElectronAppReady());
            return;
        }

        onceElectronAppReady();
    }

    public onCommand<MessageType>(channel: string, listener: (message: MessageType) => void) {
        ipcMain.on(channel, (event, message) => {
            listener(message);
        });
    }

    public on(event: "ready", listener: () => void): void;

    public on(event: any, listener: any) {
        (this.events as any)[event].push(listener);
    }

    public registerInternalEvents() {
        new Window(this);
    }

    public getBrowserWindow(): BrowserWindow {
        return this.browserWindow!;
    }

    public applyTitle() {
        this.browserWindow!.webContents.executeJavaScript(`document.title = "${this.currentTitle}"`).then(() => {
        });

        this.send<WindowOnTitleUpdateMessage>("_internal:window:titleOnUpdate _client", {
            title: this.getCurrentTitle()
        });
    }

    public send<MessageType>(channel: string, message: MessageType) {
        this.browserWindow?.webContents.send(channel, message);
    }

    public getCurrentTitle(): string {
        return this.currentTitle;
    }
}