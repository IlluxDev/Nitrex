import { terminal } from "@illuxdev/exolix-terminal/Terminal";
import packageJson from "./package.json";
import { Cli } from "@illuxdev/exolix-cli/Cli";
import { defineConfig } from "./DefineConfig";
import { NitrexAppConfig } from "./NitrexAppConfig";
import ts, { ModuleKind } from "typescript";
import fs from "fs-extra";
import path from "path";
import vm from "vm";
import deepmerge from "deepmerge";

export { defineConfig };

terminal.log("Nitrex CLI v" + packageJson.version);
const application = new Cli();

const defaultTaskFlags = {
    config: {
        type: "string",
        description: "The location of the Nitrex configuration"
    }
}

const defaultNitrexConfig = defineConfig({
    name: "Nitrex App"
});

function getNitrexConfig(configPath: string): NitrexAppConfig {
    terminal.log("Reading Nitrex config if it exists");

    if (fs.existsSync(path.join(process.cwd(), configPath))) {
        const configRaw = fs.readFileSync(path.join(process.cwd(), configPath));
        const configType = configPath.endsWith(".ts") ? "typescript" : "javascript";
        const configDir = path.dirname(path.join(process.cwd(), configPath));

        if (configType == "typescript") {
            const typescriptCompiled = ts.transpileModule(configRaw.toString(), {
                compilerOptions: {
                    type: "commonjs"
                }
            });

            return deepmerge(defaultNitrexConfig, eval(typescriptCompiled.outputText));
        }

        return deepmerge(defaultNitrexConfig, eval(configRaw.toString()));
    }

    terminal.warning("It doesnt seem like a configuration exists");
    return defaultNitrexConfig;
}

application.addCommand("dev", { ...defaultTaskFlags as any }, (args, flags) => {
    const config = getNitrexConfig(flags.config ?? "nitrex.config.ts");
    console.log(config);
});

application.execute(application.processSplice(process.argv));
