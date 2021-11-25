import { ElectronNitrex } from "../../electron/ElectronNitrex";

const nitrex = new ElectronNitrex({
    title: "Hello Nitrex"
});

nitrex.start();