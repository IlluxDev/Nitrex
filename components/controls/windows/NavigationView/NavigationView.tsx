import { Props } from "../../shared/NavigationView/Props";
import React, { useState } from "react";
import styles from "./Styles.module.scss";
import defaultIcon from "./DefaultIcon.svg";
import { TitleBar } from "../TitleBar/TitleBar";
import { Button } from "../Button/Button";
import { Icon } from "@iconify/react";
import { ToggleButton } from "../../shared/ToggleButton";
import { TextBox } from "../TextBox/TextBox";
import { NavigationItem } from "./NavigationItem";

let loop: any = null;
let setInitBack = false;

export function NavigationView(props: Props) {
    const [canGoBack, setCanGoBackState] = useState(true);
    const [sideBarOpened, setSideBarOpenedState] = useState(false);

    if (!setInitBack && document.location.pathname == "/") {
        setCanGoBackState(false);
        setInitBack = true;
    }

    return (
        <div className={styles.root}>
            <TitleBar noDrag={true} transparent={props.displayMode == "top"}
                      extendIntoView={!props.displayMode || props.displayMode == "left"}/>

            <div
                className={!props.displayMode || props.displayMode == "left" ? styles.leftModeTitleBar : styles.topModeContentArea}>
                {
                    props.displayMode != "top"
                        ?
                        <div className={styles.leftModeTitleBar}>
                            <div className={styles.leftModeTitleBarTitle}>
                                <button onClick={() => setCanGoBackState(false)}
                                        className={`${!canGoBack ? styles.leftModeTitleBarTitleButtonHide : {}}`}>
                                    <Icon
                                        style={{
                                            fontSize: "15px",
                                        }}
                                        icon="fluent:arrow-left-16-regular"
                                    />
                                </button>

                                <div className={styles.leftModeTitleBarTitleIcon}>
                                    <img src={defaultIcon}/>
                                </div>

                                <span className={styles.leftModeTitleBarTitleText}>Nitrex App [HARD CODED]</span>
                            </div>
                        </div>
                        :
                        <div>
                            <Button>Not Finished</Button>
                        </div>
                }
            </div>

            <div
                className={`${!props.displayMode || props.displayMode == "left" ? styles.leftModeContentArea : styles.topModeContentArea}`}>
                {!props.displayMode || props.displayMode == "left"
                    ?
                    <div className={`${styles.leftModeSideBar} ${!sideBarOpened ? styles.leftModeSideBarClosed : {}}`}>
                        <div>
                            <h1>Head</h1>
                            <button onClick={() => sideBarOpened ? setSideBarOpenedState(false) : setSideBarOpenedState(true)}>
                                =
                            </button>
                            <TextBox />
                        </div>

                        <div>
                            <NavigationItem sideBarOpened={sideBarOpened} items={[
                                {
                                    label: "Dark Theme [ NITREX ]",
                                    inset: 1
                                },
                                {
                                    label: "Light Theme [ NITREX ]",
                                    inset: 1
                                },
                                {
                                    label: "Third Pary Themes",
                                    inset: 1,
                                    items: [
                                        {
                                            label: "Zen",
                                            inset: 2
                                        }
                                    ]
                                }
                            ]} label="UI Themes" inset={0} />

                            <NavigationItem sideBarOpened={sideBarOpened} items={[
                                {
                                    label: "Dark Theme [ NITREX ]"                                },
                                {
                                    label: "Light Theme [ NITREX ]"                                },
                                {
                                    label: "Third Pary Themes",
                                    items: [
                                        {
                                            label: "Zen"                                        }
                                    ]
                                }
                            ]} label="UI Themes" inset={0} />
                        </div>

                        <div>
                            Settings<br />
                            <h1>Footer</h1>
                        </div>
                    </div>
                    : null
                }

                <div className={styles.contentInner}>{props.children}</div>
            </div>
        </div>
    )
}
