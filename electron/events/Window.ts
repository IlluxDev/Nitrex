import { ElectronNitrex } from "../ElectronNitrex";
import { WindowButtonActionMessage } from "../WindowButtonActionMessage";

export class Window {
    public constructor(nitrexApp: ElectronNitrex) {
        nitrexApp.onCommand<WindowButtonActionMessage>("_internal:window:buttonAction", message => {
            switch (message.action) {
                case "close":
                    nitrexApp.getBrowserWindow().close();
                    break;

                case "restore":
                    nitrexApp.getBrowserWindow().restore();
                    break;

                case "minimize":
                    nitrexApp.getBrowserWindow().minimize();
                    break;

                case "maximize":
                    nitrexApp.getBrowserWindow().maximize();
                    break;
            }
        });
    }
}