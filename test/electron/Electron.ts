import { ElectronNitrex } from "../../electron/ElectronNitrex";

const nitrex = new ElectronNitrex({
    title: "Nitrex App",
    browserWindowOptions: {
        frame: false
    }
});

nitrex.on("ready", () => {
    nitrex.log("App is ready");
});

nitrex.start();