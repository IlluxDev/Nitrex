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

    public constructor(options: ElectronNitrexOptions) {
        this.electronAppReady = app.isReady();

        if (!this.electronAppReady) {
            app.on("ready", () => this.electronAppReady = true);
        }

        this.settings = deepmerge<ElectronNitrexOptions>({
            browserWindowOptions: {
                width: 1200,
                height: 800,
                title: "",
                frame: false,
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
                show: false,
                icon: this.settings.icon ?? path.join(__dirname, "assets/DefaultIcon.png")
            }, this.settings.browserWindowOptions!));

            if (electronIsDev) {
                this.browserWindow.loadURL("http://localhost:3000").then(() => {
                    this.browserWindow!.show();
                    this.browserWindow!.webContents.executeJavaScript(`document.title = "${this.settings.title}"`).then(() => {});
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
}