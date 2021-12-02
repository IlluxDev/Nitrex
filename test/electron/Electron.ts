import { ElectronNitrex } from "@illuxdev/nitrex-electron";
import * as path from "path";

const nitrex = new ElectronNitrex({
    title: "Nitrex Demo",
    projectRoot: path.join(__dirname, "../")
});

nitrex.getBrowserWindow()

nitrex.on("ready", () => {
    nitrex.log("App is ready");
});

nitrex.onCommand<string>("main", (msg) => {
    nitrex.log(msg);
});

nitrex.onCommand<string>("main", (msg) => {
    nitrex.log(msg + " < Second listener");
});

nitrex.start();
