import {ElectronNitrex} from "../../electron/ElectronNitrex";

const nitrex = new ElectronNitrex({
    title: "Nitrex Demo",
    browserWindowOptions: {
        frame: true
    }
});

nitrex.on("ready", () => {
    nitrex.log("App is ready");
});

nitrex.start();