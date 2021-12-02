import { Props } from "../../shared/NavigationView/Props";
import React from "react";
import styles from "./Styles.module.scss";
import { Icon } from "@iconify/react";
import { TitleBar } from "../TitleBar/TitleBar";

export function NavigationView(props: Props) {
    return (
        <div className={styles.root}>
            <TitleBar transparent={props.displayMode == "top"}
                      extendIntoView={!props.displayMode || props.displayMode == "left"}/>

            <div>
                <div>
                    <div>
                        <Icon icon={"fluent:search-16-regular"}/>
                    </div>

                    <span>Nitrex App [HARD CODED]</span>
                </div>


            </div>
        </div>
    )
}
