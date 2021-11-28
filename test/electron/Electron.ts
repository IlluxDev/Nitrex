import { ElectronNitrex } from "@illuxdev/nitrex-electron";

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