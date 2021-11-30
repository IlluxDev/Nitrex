import React from "react";
import { Props } from "../../shared/TextBlock/Props";
import styles from "./Styles.module.scss";

export function TextBlock(props: Props) {
    return (
        <div
            className={`${styles.root} ${props.header ? styles["header-" + props.header + "-mode"] : {}}`}>{props.children}</div>
    );
}