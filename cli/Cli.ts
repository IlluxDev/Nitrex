import { terminal } from "@illuxdev/exolix-terminal/Terminal";
import packageJson from "./package.json";
import { Cli } from "@illuxdev/exolix-cli/Cli";
import { defineConfig } from "./DefineConfig";
import { NitrexAppConfig } from "./NitrexAppConfig";
import ts, { ModuleKind } from "typescript";
import fs from "fs-extra";
import path from "path";

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
            console.log(typescriptCompiled);

            const lastCwd = process.cwd();
            process.chdir(configDir);

            console.log(eval(typescriptCompiled.outputText));
        }

        return {};
    }

    return defaultNitrexConfig;
}

application.addCommand("dev", { ...defaultTaskFlags as any }, (args, flags) => {
    const config = getNitrexConfig(flags.config ?? "nitrex.config.ts");
});

application.execute(application.processSplice(process.argv));
