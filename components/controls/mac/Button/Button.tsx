import React from "react";
import { Props } from "../../shared/Button/Props";
import styles from "./Styles.module.scss";

export function Button(props: Props) {
    return (
        <button className={styles.root}>{props.children}</button>
    )
}