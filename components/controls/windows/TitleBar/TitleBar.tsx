import { Props } from "../../shared/TitleBar/Props";
import React, { useState } from "react";
import styles from "./Styles.module.scss";
import { Icon } from "@iconify/react";
import { ipcController } from "../../IpcController";
import { WindowButtonActionMessage } from "./WindowButtonActionMessage";
import { WindowOnTitleUpdateMessage } from "./WindowOnTitleUpdateMessage";

let onTitleUpdated = (title: string) => {
};
ipcController.onCommand<WindowOnTitleUpdateMessage>("_internal:window:titleOnUpdate _client", message => onTitleUpdated(message.title));

export function TitleBar(props: Props) {
    const [title, setTitleState] = useState(document.title);

    ipcController.send("_internal:window:applyTitle", {});
    ipcController.send("_internal:window:fetchTitle", {});

    onTitleUpdated = (title) => {
        setTitleState(title);
    }

    function minimizeWindow() {
        ipcController.send<WindowButtonActionMessage>("_internal:window:buttonAction", {
            action: "minimize"
        });
    }

    return (
        <div className={`${styles.root} ${props.extendIntoView ? styles.extendIntoViewMode : {}}`}>
            <div>
                <span>{title}</span>
            </div>

            <div className={styles.buttons}>
                <button onClick={() => minimizeWindow()}>
                    <Icon style={{
                        fontSize: "17px"
                    }} icon={"fluent:subtract-16-regular"}/>
                </button>

                <button style={{
                    fontSize: "16px"
                }}>
                    <Icon icon={"fluent:maximize-16-regular"}/>
                </button>

                <button style={{
                    fontSize: "16px"
                }} className={styles.closeButton}>
                    <Icon icon={"fluent:dismiss-16-regular"}/>
                </button>
            </div>
        </div>
    );
}