import React from "react";
import styles from "./Styles.module.scss";
import { Props } from "../../shared/Button/Props";

export function Button(props: Props) {
    return (
        <button className={styles.root}>
            {props.children}
        </button>
    )
}