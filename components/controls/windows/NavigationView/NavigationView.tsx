import { Props } from "../../shared/NavigationView/Props";
import React from "react";
import styles from "./Styles.module.scss";
import defaultIcon from "./DefaultIcon.svg";
import { TitleBar } from "../TitleBar/TitleBar";
import { Button } from "../Button/Button";

export function NavigationView(props: Props) {
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
        </div>
    )
}
