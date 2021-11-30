import { DevFlags } from "./DevFlags";
import { NitrexAppConfig } from "../../NitrexAppConfig";
import { terminal } from "@illuxdev/exolix-terminal";
import { ChildProcess, spawn } from "child_process";
import path from "path";
import chokidar from "chokidar";
import electronString from "electron";

export class Dev {
    private readonly settings: NitrexAppConfig;

    public constructor(
        args: string[],
        flags: DevFlags,
        config: NitrexAppConfig
    ) {
        terminal.log("Starting development server");
        this.settings = config;

        this.startReactServer().then((port) => {
            terminal.success(
                `Development server has been started at port "${port}"`
            );

            this.launchApplication(port).then(() => {
                terminal.success(
                    "The application has launched, development server is fully ready!"
                );
            });
        });
    }

    private startReactServer(): Promise<number> {
        return new Promise((resolve, reject) => {
            const config = this.settings;
            const reactServer = spawn(
                process.platform == "win32" ? "npx.cmd" : "npx",
                ["vite"]
            );

            const serverReadyRegexp = /> Local: http:\/\/localhost:(.*?)\/\n/;

            const onData = (data: Buffer, type: "stdout" | "stderr") => {
                const regexpResult = serverReadyRegexp.exec(data.toString());

                if (regexpResult) {
                    resolve((regexpResult as any)[1]);
                }
            };

            reactServer.stdout.on("data", (d) => onData(d, "stdout"));
            reactServer.stderr.on("data", (d) => onData(d, "stderr"));
        });
    }

    private launchApplication(port: number): Promise<void> {
        const config = this.settings;

        return new Promise((resolve, reject) => {
            const startTypeScriptWatch: () => Promise<void> = () => {
                return new Promise((resolve) => {
                    terminal.log("Starting TypeScript");

                    const typeScriptWatcher = spawn(
                        process.platform == "win32" ? "npx.cmd" : "npx",
                        ["tsc", "--watch"],
                        {
                            cwd: path.join(
                                process.cwd(),
                                path.dirname(config.electronMainFile!)
                            ),
                        }
                    );

                    typeScriptWatcher.stdout.on("data", (d) => {
                        if (
                            d.toString().includes("Watching for file changes.")
                        ) {
                            resolve();
                        }
                    });
                });
            };

            startTypeScriptWatch().then(() => {
                terminal.success("TypeScript is ready");
                terminal.log("Launching application");

                let electronMainFile = config.electronMainFile!;
                if (electronMainFile?.endsWith(".ts")) {
                    electronMainFile =
                        electronMainFile?.slice(0, -1).slice(0, -1) + "js";
                }

                let electronWindow: ChildProcess;

                let initialReady = false;

                const onData = (d: Buffer) => {
                    if (
                        !initialReady &&
                        d
                            .toString()
                            .replace("\n", "")
                            .startsWith("[_atron][window]-ready")
                    ) {
                        initialReady = true;
                        resolve();
                    }

                    if (
                        d
                            .toString()
                            .replace("\n", "")
                            .startsWith("[_atron][debug][log]-")
                    ) {
                        terminal.log(
                            "[ APP ] " +
                            d
                                .toString()
                                .replace("\n", "")
                                .slice("[_atron][debug][log]-".length)
                        );
                    }

                    if (
                        d
                            .toString()
                            .replace("\n", "")
                            .startsWith("[_atron][app]-stop")
                    ) {
                        terminal.log("Stopping development server");
                        process.exit();
                    }
                };

                const spawnElectron = () => {
                    electronWindow = spawn(
                        electronString as unknown as string,
                        [electronMainFile],
                        {
                            cwd: process.cwd(),
                        }
                    );

                    electronWindow!.stdout!.on("data", onData);
                };

                const restartElectron = () => {
                    terminal.log("Reloading application");
                    electronWindow!.kill("SIGINT");
                    spawnElectron();
                };

                const fileWatcher = chokidar.watch(
                    path.dirname(
                        path.join(process.cwd(), config.electronMainFile!)
                    )
                );

                fileWatcher.on("all", (event, path) => {
                    if (path.endsWith(".js")) {
                        restartElectron();
                    }
                });

                spawnElectron();
            });
        });
    }
}
