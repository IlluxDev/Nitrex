import { Props } from "../../shared/NavigationView/Props";
import React, { useState } from "react";
import styles from "./Styles.module.scss";
import defaultIcon from "./DefaultIcon.svg";
import { TitleBar } from "../TitleBar/TitleBar";
import { Button } from "../Button/Button";
import { Icon } from "@iconify/react";

let loop: any = null;

export function NavigationView(props: Props) {
    const [canGoBack, setCanGoBackState] = useState(true);

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
                    <div>
                        Side
                    </div>
                    : null
                }

                <div className={styles.contentInner}>{props.children}</div>
            </div>
        </div>
    )
}
