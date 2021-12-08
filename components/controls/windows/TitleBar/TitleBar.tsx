import { Props } from "../../shared/TitleBar/Props";
import React, { CSSProperties, useEffect, useState } from "react";
import styles from "./Styles.module.scss";
import { Icon } from "@iconify/react";
import { ipcController } from "../../IpcController";
import { WindowOnTitleUpdateMessage } from "../../shared/TitleBar/WindowOnTitleUpdateMessage";
import { WindowButtonActionMessage } from "../../shared/TitleBar/WindowButtonActionMessage";

let onTitleUpdated = (title: string) => {};
let onMaximized = () => {};
let onRestored = () => {};

ipcController.onCommand("_internal:window:maximized", () => onMaximized());
ipcController.onCommand("_internal:window:unMaximized", () => onRestored());

ipcController.onCommand<WindowOnTitleUpdateMessage>(
    "_internal:window:titleOnUpdate _client",
    (message) => onTitleUpdated(message.title)
);

export function TitleBar(props: Props) {
    const [title, setTitleState] = useState(document.title);
    const [canGoBack, setCanGoBackState] = useState(false);
    const [maximized, setMaximizedState] = useState(false);

    useEffect(
        () => setCanGoBackState(document.location.pathname != "/"),
        [location]
    );

    ipcController.send("_internal:window:applyTitle", {});
    ipcController.send("_internal:window:fetchTitle", {});

    onTitleUpdated = (title) => {
        setTitleState(title);
    };

    onMaximized = () => setMaximizedState(true);
    onRestored = () => setMaximizedState(false);

    function minimizeWindow() {
        ipcController.send<WindowButtonActionMessage>(
            "_internal:window:buttonAction",
            {
                action: "minimize",
            }
        );
    }

    function maximizeRestoreWindow() {
        if (maximized) {
            ipcController.send<WindowButtonActionMessage>(
                "_internal:window:buttonAction",
                {
                    action: "restore",
                }
            );
            return;
        }

        ipcController.send<WindowButtonActionMessage>(
            "_internal:window:buttonAction",
            {
                action: "maximize",
            }
        );
    }

    const jsStyles: CSSProperties = {};

    if (props.transparent) {
        jsStyles.background = "transparent";
    }

    if (props.noDrag) {
        jsStyles["WebkitAppRegion"] = "no-drag";
    }

    return (
        <div
            className={`${styles.root} ${
                props.extendIntoView ? styles.extendIntoViewMode : {}
            }`}
            style={jsStyles}
        >
            <div className={styles.titleArea}>
                {!props.disableAutoBackButton &&
                !props.extendIntoView &&
                canGoBack ? (
                    <button onClick={() => history.go(-1)}>
                        <Icon
                            style={{
                                fontSize: "15px",
                            }}
                            icon="fluent:arrow-left-16-regular"
                        />
                    </button>
                ) : null}

                {!props.extendIntoView ? (
                    <span className={styles.titleText}>{title}</span>
                ) : null}
            </div>

            <div className={styles.buttons}>
                <button onClick={() => minimizeWindow()}>
                    <Icon
                        style={{
                            fontSize: "17px",
                        }}
                        icon={"fluent:subtract-16-regular"}
                    />
                </button>

                {maximized ? (
                    <button
                        onClick={() => maximizeRestoreWindow()}
                        style={{
                            fontSize: "16px",
                        }}
                    >
                        <Icon icon={"fluent:restore-16-regular"} />
                    </button>
                ) : (
                    <button
                        onClick={() => maximizeRestoreWindow()}
                        style={{
                            fontSize: "16px",
                        }}
                    >
                        <Icon icon={"fluent:maximize-16-regular"} />
                    </button>
                )}

                <button
                    onClick={() => window.close()}
                    style={{
                        fontSize: "16px",
                    }}
                    className={styles.closeButton}
                >
                    <Icon icon={"fluent:dismiss-16-regular"} />
                </button>
            </div>
        </div>
    );
}
