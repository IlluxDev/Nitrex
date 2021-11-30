import { ElectronNitrex } from "../ElectronNitrex";
import { WindowButtonActionMessage } from "../WindowButtonActionMessage";
import { WindowOnTitleUpdateMessage } from "./WindowOnTitleUpdateMessage";

export class Window {
    public constructor(nitrexApp: ElectronNitrex) {
        nitrexApp.onCommand<WindowButtonActionMessage>(
            "_internal:window:buttonAction",
            (message) => {
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
            }
        );

        nitrexApp.onCommand("_internal:window:applyTitle", () => {
            nitrexApp.applyTitle();
        });

        nitrexApp.onCommand("_internal:window:fetchTitle", () => {
            nitrexApp.send<WindowOnTitleUpdateMessage>(
                "_internal:window:titleOnUpdate _client",
                {
                    title: nitrexApp.getCurrentTitle(),
                }
            );
        });
    }
}
