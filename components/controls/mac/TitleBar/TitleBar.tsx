import { Props } from "../../shared/TitleBar/Props";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import styles from "./Styles.module.scss";
import { ipcController } from "../../IpcController";
import { WindowOnTitleUpdateMessage } from "../../shared/TitleBar/WindowOnTitleUpdateMessage";
import { WindowButtonActionMessage } from "../../shared/TitleBar/WindowButtonActionMessage";

let onTitleUpdated = (title: string) => {
};
let onMaximized = () => {
};
let onRestored = () => {
}

ipcController.onCommand("_internal:window:maximized", () => onMaximized());
ipcController.onCommand("_internal:window:unMaximized", () => onRestored());

ipcController.onCommand<WindowOnTitleUpdateMessage>(
    "_internal:window:titleOnUpdate _client",
    (message) => onTitleUpdated(message.title)
);

export function TitleBar(props: Props) {
    const [maximized, setMaximizedState] = useState(false);
    const [title, setTitleState] = useState("...");

    // TODO: Fix
    onTitleUpdated = title => {
        setTitleState(title);
        console.log(title)
    }

    onMaximized = () => setMaximizedState(true);
    onRestored = () => setMaximizedState(false);

    ipcController.send("_internal:window:applyTitle", {});
    ipcController.send("_internal:window:fetchTitle", {});

    return (
        <div className={styles.root}>
            <div className={styles.buttonsArea}>
                <button onClick={() => {
                    ipcController.send<WindowButtonActionMessage>("_internal:window:buttonAction", {
                        action: "close"
                    });
                }}>
                    <Icon icon={"fluent:dismiss-16-regular"} />
                </button>

                <button onClick={() => {
                    ipcController.send<WindowButtonActionMessage>("_internal:window:buttonAction", {
                        action: "minimize"
                    });
                }}>
                    <Icon icon={"fluent:subtract-16-regular"} />
                </button>

                <button onClick={() => {
                    if (maximized) {
                        ipcController.send<WindowButtonActionMessage>("_internal:window:buttonAction", {
                            action: "restore"
                        });
                        return;
                    }

                    ipcController.send<WindowButtonActionMessage>("_internal:window:buttonAction", {
                        action: "maximize"
                    });
                }}>
                    <Icon icon="eva:expand-fill" />
                </button>
            </div>

            <span className={styles.title}>{title}</span>
            <div />
        </div>
    )
}
