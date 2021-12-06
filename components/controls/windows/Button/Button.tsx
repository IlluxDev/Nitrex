import React from "react";
import styles from "./Styles.module.scss";
import { Props } from "../../shared/Button/Props";

export function Button(props: Props) {
    return (
        <div>
            <button
                onClick={() => (props.onClick ? props.onClick() : null)}
                className={`${styles.button} ${
                    props.primary ? styles.primaryMode : {}
                } ${props.disabled ? styles.disabledMode : {}}`}
            >
                {props.children}
            </button>
        </div>
    );
}
