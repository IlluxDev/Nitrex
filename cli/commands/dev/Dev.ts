import { DevFlags } from "./DevFlags";
import { NitrexAppConfig } from "../../NitrexAppConfig";
import { terminal } from "@illuxdev/exolix-terminal/Terminal";
import { spawn } from "child_process";
import path from "path";

export class Dev {
    private readonly settings: NitrexAppConfig;
    private onStopEvents = [] as any[];

    public constructor(args: string[], flags: DevFlags, config: NitrexAppConfig) {
        terminal.log("Starting development server");
        this.settings = config;

        this.startReactServer().then(port => {
            terminal.success(`Development server has been started at port "${port}"`);

            this.launchApplication(port).then(() => {
                terminal.success("The application has launched, development server is fully ready!");
            });
        });
    }

    private startReactServer(): Promise<number> {
        return new Promise((resolve, reject) => {
            const config = this.settings;
            const reactServer = spawn(process.platform == "win32" ? "npx.cmd" : "npx", [
                "vite"
            ]);

            this.onStopEvents.push(() => {
                reactServer.kill(0);
            });

            const serverReadyRegexp = /> Local: http:\/\/localhost:(.*?)\/\n/;

            const onData = (data: Buffer, type: "stdout" | "stderr") => {
                const regexpResult = serverReadyRegexp.exec(data.toString());

                if (regexpResult) {
                    resolve((regexpResult as any)[1]);
                }
            }

            reactServer.stdout.on("data", d => onData(d, "stdout"));
            reactServer.stderr.on("data", d => onData(d, "stderr"));
        });
    }

    private launchApplication(port: number): Promise<void> {
        const config = this.settings;

        return new Promise((resolve, reject) => {
            const startTypeScriptWatch: () => Promise<void> = () => {
                return new Promise(resolve => {
                    terminal.log("Starting TypeScript");

                    const typeScriptWatcher = spawn(process.platform == "win32" ? "npx.cmd" : "npx", [
                        "tsc",
                        "--watch"
                    ], {
                        cwd: path.join(process.cwd(), path.dirname(config.electronMainFile!))
                    });

                    this.onStopEvents.push(() => {
                        typeScriptWatcher.kill();
                    });

                    typeScriptWatcher.stdout.on("data", d => {
                        if (d.toString().includes("Watching for file changes.")) {
                            resolve();
                        }
                    });
                });
            }

            startTypeScriptWatch().then(() => {
                terminal.success("TypeScript is ready");
                terminal.log("Launching application");

                let electronMainFile = config.electronMainFile!;
                if (electronMainFile?.endsWith(".ts")) {
                    electronMainFile = electronMainFile?.slice(0, -1).slice(0, -1) + "js";
                }

                const electronWindow = spawn(process.platform == "win32" ? "npx.cmd" : "npx", [
                    "electron",
                    electronMainFile
                ], {
                    cwd: process.cwd()
                });

                electronWindow.stdout.on("data", d => console.log(d.toString()));
                electronWindow.stderr.on("data", d => console.log(d.toString()));
            });
        });
    }
}