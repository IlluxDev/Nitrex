import { ElectronNitrexOptions } from "./ElectronNitrexOptions";
import deepmerge from "deepmerge";
import { app, BrowserWindow, BrowserWindowConstructorOptions, dialog, ipcMain } from "electron";
import electronIsDev from "electron-is-dev";
import path from "path";

export class ElectronNitrex {
    private settings: ElectronNitrexOptions;
    private electronAppReady: boolean;
    private started = false;
    private browserWindow?: BrowserWindow;
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
                this.browserWindow!.webContents.executeJavaScript(`document.title = "${this.settings.title}"`).then(() => {
                });
            }

            if (electronIsDev) {
                this.browserWindow.loadURL("http://localhost:3000").then(() => {
                    onWindowLoad();
                    console.log("[_atron][window]-ready");

                    this.browserWindow?.on("close", () => {
                        console.log("[_atron][app]-stop");
                    });

                    this.events.ready.forEach(event => event());
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
}