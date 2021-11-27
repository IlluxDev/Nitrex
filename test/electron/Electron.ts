import { ElectronNitrex } from "../../electron/ElectronNitrex";

const nitrex = new ElectronNitrex({
    title: "Nitrex App"
});

nitrex.start();