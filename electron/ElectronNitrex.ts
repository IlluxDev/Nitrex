import { ElectronNitrexOptions } from "./ElectronNitrexOptions";
import deepmerge from "deepmerge";
import { app, BrowserWindow, BrowserWindowConstructorOptions, dialog } from "electron";
import electronIsDev from "electron-is-dev";
import path from "path";

export class ElectronNitrex {
    private settings: ElectronNitrexOptions;
    private electronAppReady: boolean;
    private started = false;
    private browserWindow?: BrowserWindow;
    private events = {
        ready: [] as any[]
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

            if (electronIsDev) {
                this.browserWindow.loadURL("http://localhost:3000").then(() => {
                    this.browserWindow!.show();
                    this.browserWindow!.webContents.executeJavaScript(`document.title = "${this.settings.title}"`).then(() => {});
                    console.log("[_atron][window]-ready");

                    this.events.ready.forEach(event => event());
                });
            } else {
                throw new Error("Production build is not supported currently");
            }
        }

        if (!this.electronAppReady) {
            app.on("ready", () => onceElectronAppReady());
            return;
        }

        onceElectronAppReady();
    }

    public on(event: "ready", listener: () => void): void;

    public on(event: any, listener: any) {
        (this.events as any)[event].push(listener);
    }
}