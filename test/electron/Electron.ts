import { ElectronNitrex } from "@illuxdev/nitrex-electron";
import * as path from "path";

const nitrex = new ElectronNitrex({
    title: "Nitrex Demo",
    browserWindowOptions: {
        frame: true
    },
    projectRoot: path.join(__dirname, "../")
});

nitrex.on("ready", () => {
    nitrex.log("App is ready");
});

nitrex.start();