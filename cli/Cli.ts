import { terminal } from "@illuxdev/exolix-terminal/Terminal";
import packageJson from "./package.json";
import { Cli } from "@illuxdev/exolix-cli/Cli";
import { defineConfig } from "./DefineConfig";
import { NitrexAppConfig } from "./NitrexAppConfig";
import fs from "fs-extra";
import path from "path";
import { exec } from "child_process";

export { defineConfig };

terminal.log("Nitrex CLI v" + packageJson.version);
const application = new Cli();

const defaultTaskFlags = {
    config: {
        type: "string",
        description: "The location of the Nitrex configuration"
    }
}

const defaultNitrexConfig = {
    electronMainFile: "./electron/Electron.ts"
} as NitrexAppConfig;

function getNitrexConfig(configPath: string): Promise<NitrexAppConfig> {
    return new Promise((resolve, reject) => {
        terminal.log("Reading Nitrex config if it exists");

        const resolveWithJson = (data: string) => {
            console.log(data);
            try {
                console.log(data)
                const jsonConfig = JSON.parse(data);
                resolve(jsonConfig);
            } catch (error: any) {
                console.log(error);
                terminal.warning("There seems to be an error in your config, using default config now");
            }
        }

        if (fs.existsSync(path.join(process.cwd(), configPath))) {
            const configType = configPath.endsWith(".ts") ? "typescript" : "javascript";
            const configDir = path.dirname(path.join(process.cwd(), configPath));

            if (configType == "typescript") {
                console.log(`npx ts-node "${path.join(process.cwd(), configPath)}"`);
                const configProcess = exec(`npx ts-node "${path.join(process.cwd(), configPath)}"`);

                configProcess.stdout?.on("data", resolveWithJson);
            }

            const configProcess = exec(`node "${path.join(process.cwd(), configPath)}"`);
            configProcess.stdout?.on("data", data => resolveWithJson);
            return;
        }

        terminal.warning("It doesnt seem like a configuration exists");
        resolve(defaultNitrexConfig);
    });
}

application.addCommand("dev", { ...defaultTaskFlags as any }, (args, flags) => {
    getNitrexConfig(flags.config ?? "nitrex.config.ts").then(config => {
        console.log(config);
    });
});

application.execute(application.processSplice(process.argv));
