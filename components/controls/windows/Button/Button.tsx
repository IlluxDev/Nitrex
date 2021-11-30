import React from "react";
import styles from "./Styles.module.scss";
import { Props } from "../../shared/Button/Props";

export function Button(props: Props) {
    return (
        <button
            onClick={() => (props.onClick ? props.onClick() : null)}
            className={`${styles.root} ${
                props.primary ? styles.primaryMode : {}
            } ${props.disabled ? styles.disabledMode : {}}`}
        >
            {props.children}
        </button>
    );
}
