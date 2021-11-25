import {ElectronOptions} from "./ElectronOptions";
import deepmerge from "deepmerge";

export class Electron {
    private settings: ElectronOptions;

    public constructor(options: ElectronOptions) {
        this.settings = deepmerge<ElectronOptions>({

        }, options);
    }
}