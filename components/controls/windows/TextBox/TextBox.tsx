import { Props } from "../../shared/TextBox/Props";
import React from "react";
import styles from "./Styles.module.scss";

export function TextBox(props: Props) {
    return (
        <div className={styles.root}>
            <div className={styles.input}>
                <input placeholder={props.placeholder} type={props.type == "password" ? "password" : "text"}/>
            </div>
        </div>
    );
}
