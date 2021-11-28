import { BrowserWindowConstructorOptions } from "electron";

export interface ElectronNitrexOptions {
    browserWindowOptions?: BrowserWindowConstructorOptions;
    width?: number;
    height?: number;
    title?: string;
    icon?: string | null;
    projectRoot: string;
}