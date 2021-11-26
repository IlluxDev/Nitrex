import { terminal } from "@illuxdev/exolix-terminal/Terminal";
import packageJson from "./package.json";
import { Cli } from "@illuxdev/exolix-cli/Cli";

terminal.log("Nitrex CLI v" + packageJson.version);
const application = new Cli();

application.addCommand("dev", {}, () => {
    terminal.log("Development server");
});

application.execute(application.processSplice(process.argv));
