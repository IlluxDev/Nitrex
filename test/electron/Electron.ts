import { ElectronNitrex } from "../../electron/ElectronNitrex";

const nitrex = new ElectronNitrex({
    title: "Nitrex App"
});

nitrex.on("ready", () => {
    nitrex.log("App is ready");
});

nitrex.start();