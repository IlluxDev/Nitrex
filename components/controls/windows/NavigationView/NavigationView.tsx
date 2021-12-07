import { Props } from "../../shared/NavigationView/Props";
import React, { useEffect, useState } from "react";
import styles from "./Styles.module.scss";
import defaultIcon from "./DefaultIcon.svg";
import { TitleBar } from "../TitleBar/TitleBar";
import { Button } from "../Button/Button";
import { Icon } from "@iconify/react";
import { TextBox } from "../TextBox/TextBox";
import { NavigationItem } from "./NavigationItem";
import { FlexPanel, ipcController, routeManager } from "../../../Components";
import { WindowOnTitleUpdateMessage } from "../../shared/TitleBar/WindowOnTitleUpdateMessage";
import { useLocation } from "react-router-dom";

let onTitleUpdated = (title: string) => {};

ipcController.onCommand<WindowOnTitleUpdateMessage>(
    "_internal:window:titleOnUpdate _client",
    (message) => onTitleUpdated(message.title)
);

let onRouteUpdated: (name: string) => void = null;

routeManager.on("routeChange", name => {
    onRouteUpdated ? onRouteUpdated(name) : null;
});

export function NavigationView(props: Props) {
    const [title, setTitleState] = useState(document.title);
    const [canGoBack, setCanGoBackState] = useState(false);
    const [sideBarOpened, setSideBarOpenedState] = useState(
        localStorage.getItem("_Nitrex_NavigationView_opened") == "true"
    );

    onRouteUpdated = name => {
        if (routeManager.getHistoryPosition() == 0) {
            setCanGoBackState(false);
            return;
        }

        setCanGoBackState(true);
    }

    ipcController.send("_internal:window:applyTitle", {});
    ipcController.send("_internal:window:fetchTitle", {});

    onTitleUpdated = (title) => {
        setTitleState(title);
    };

    return (
        <div className={styles.root}>
            <TitleBar
                noDrag={props.displayMode == undefined || props.displayMode == "left"}
                transparent={props.displayMode == "top"}
                extendIntoView={
                    !props.displayMode || props.displayMode == "left"
                }
            />

            <div
                className={
                    !props.displayMode || props.displayMode == "left"
                        ? styles.leftModeTitleBar
                        : styles.topModeContentArea
                }
            >
                {props.displayMode != "top" ? (
                    <div className={styles.leftModeTitleBar}>
                        <div className={styles.leftModeTitleBarTitle}>
                            <button
                                onClick={() => routeManager.back()}
                                className={`${
                                    !canGoBack
                                        ? styles.leftModeTitleBarTitleButtonHide
                                        : {}
                                }`}
                            >
                                <Icon
                                    style={{
                                        fontSize: "15px",
                                    }}
                                    icon="fluent:arrow-left-16-regular"
                                />
                            </button>

                            <div className={styles.leftModeTitleBarTitleIcon}>
                                <img
                                    alt={"ERROR: Failed to load default icon"}
                                    src={defaultIcon}
                                />
                            </div>

                            <span className={styles.leftModeTitleBarTitleText}>{title}</span>
                        </div>
                    </div>
                ) : (
                    <div>
                        <Button>Not Finished</Button>
                    </div>
                )}
            </div>

            <div
                className={`${
                    !props.displayMode || props.displayMode == "left"
                        ? styles.leftModeContentArea
                        : styles.topModeContentArea
                }`}
            >
                {!props.displayMode || props.displayMode == "left" ? (
                    <div
                        className={`${styles.leftModeSideBar} ${
                            !sideBarOpened ? styles.leftModeSideBarClosed : {}
                        }`}
                    >
                        <div className={styles.leftModeSideBarHeader}>
                            {props.headerContent ? (
                                <div>{props.headerContent}</div>
                            ) : null}

                            <button
                                className={styles.leftModeSideBarIconButton}
                                onClick={() => {
                                    sideBarOpened
                                        ? setSideBarOpenedState(false)
                                        : setSideBarOpenedState(true);
                                    localStorage.setItem(
                                        "_Nitrex_NavigationView_opened",
                                        !sideBarOpened + ""
                                    );
                                }}
                            >
                                <Icon icon={"fluent:navigation-16-regular"} />
                            </button>

                            {!sideBarOpened && props.search ? (
                                <button
                                    onClick={() => {
                                        setSideBarOpenedState(true);
                                    }}
                                    className={styles.leftModeSideBarIconButton}
                                >
                                    <Icon icon={"fluent:search-16-regular"} />
                                </button>
                            ) : props.search ? (
                                <FlexPanel padding={[5, 20]}>
                                    <TextBox type={"search"} placeholder={"Search"} />
                                </FlexPanel>
                            ) : null}
                        </div>

                        <div
                            className={`${styles.leftModeSideBarContent} ${
                                !sideBarOpened
                                    ? styles.leftModeSideBarContentClosed
                                    : {}
                            }`}
                        >
                            {props.content.map((item) => {
                                return (
                                    <NavigationItem
                                        key={
                                            item.label +
                                            item.label?.toString() +
                                            Math.random()
                                        }
                                        {...item}
                                        sideBarOpened={sideBarOpened}
                                        inset={0}
                                    />
                                );
                            })}
                        </div>

                        <div className={styles.leftModeSideBarFooter}>
                            {props.footer?.map((footerItem) => {
                                return (
                                    <NavigationItem
                                        {...footerItem}
                                        key={
                                            footerItem.label +
                                            footerItem.label?.toString() +
                                            Math.random()
                                        }
                                        sideBarOpened={sideBarOpened}
                                    />
                                );
                            })}

                            {props.settings == undefined || props.settings ? (
                                <NavigationItem
                                    action={"/settings"}
                                    icon={"fluent:settings-16-regular"}
                                    sideBarOpened={sideBarOpened}
                                    label={"Settings"}
                                />
                            ) : null}
                        </div>
                    </div>
                ) : null}

                <div className={styles.contentInner}>{props.children}</div>
            </div>
        </div>
    );
}
