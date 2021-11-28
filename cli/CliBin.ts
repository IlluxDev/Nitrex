#!/usr/bin/env node

import { terminal } from "@illuxdev/exolix-terminal";
import packageJson from "./package.json";
import { Cli } from "@illuxdev/exolix-cli";
import { NitrexAppConfig } from "./NitrexAppConfig";
import fs from "fs-extra";
import path from "path";
import { exec } from "child_process";
import { Dev } from "./commands/dev/Dev";
import deepmerge from "deepmerge";
import { Build } from "./commands/build/Build";

terminal.log("Nitrex CLI v" + packageJson.version);
const application = new Cli();

const defaultTaskFlags = {
    config: {
        type: "string",
        description: "The location of the Nitrex configuration"
    },
    useDefaultConfig: {
        type: "boolean",
        description: "Ignore the project configuration and use the default config"
    }
}

const defaultNitrexConfig = {
    electronMainFile: "./electron/Electron.ts"
} as NitrexAppConfig;

function getNitrexConfig(configPath: string, useDefaultConfig: boolean = false): Promise<NitrexAppConfig> {
    if (configPath == undefined) {
        configPath = "nitrex.config.ts"
    }

    return new Promise((resolve, reject) => {
        if (useDefaultConfig) {
            resolve(defaultNitrexConfig);
            return;
        }

        terminal.log("Reading Nitrex config if it exists");

        const resolveWithJson = (data: string) => {
            try {
                const jsonConfig = JSON.parse(data);
                resolve(deepmerge(defaultNitrexConfig, jsonConfig));
            } catch (error: any) {
                terminal.warning("There seems to be an error in your config, using default config now");
            }
        }

        if (fs.existsSync(path.join(process.cwd(), configPath))) {
            const configType = configPath.endsWith(".ts") ? "typescript" : "javascript";

            if (configType == "typescript") {
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

application.useCustomHelperRenderer((helpList, commandName) => {
    if (commandName) {
        let matched = false;

        helpList.forEach(helpPage => {
            if (helpPage.commandName == commandName) {
                matched = true;

                terminal.log(` -- ${helpPage.usage} --`);
                terminal.log("");

                terminal.log("Options:");
                for (const flag in helpPage.flags) {
                    terminal.log(` -  ${flag}  -  ${helpPage.flags[flag].description}`);
                }
            }
        });

        if (!matched) {
            terminal.error(`That command does not exist, use "help" for a list of commands`);
        }
        return;
    }

    terminal.log(`Help List | Type "help [ Command Name ] for a detailed view"`);
    helpList.forEach(helpPage => {
        terminal.log(` -  ${helpPage.commandName}  -  ${helpPage.description}`);
    });
});

application.addCommand("dev", {...defaultTaskFlags as any}, (args, flags) => {
    getNitrexConfig(flags.config, (flags.useDefaultConfig == "true" || flags.useDefaultConfig as any == true)).then(config => new Dev(args, flags, config));
}, {
    description: "Start your application in development mode"
});

application.addCommand("build", {
    ...defaultTaskFlags as any,
    platform: {
        type: "string",
        description: "The platform type to build for"
    }
}, (args, flags) => {
    getNitrexConfig(flags.config, (flags.useDefaultConfig == "true" || flags.useDefaultConfig as any == true)).then(config => new Build(args, flags, config));
}, {
    description: "Build your application"
});

application.execute(application.processSplice(process.argv));
