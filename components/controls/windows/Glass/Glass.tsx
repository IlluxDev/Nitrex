import React from "react";
import { Props } from "../../shared/Glass/Props";
import styles from "./Styles.module.scss";
import sheet from "./sheet.png";

export function Glass(props: Props) {
    return (
        <div style={props.style ?? {}} className={`${styles.root}`}>
            <div style={{
                opacity: "0.05",
                backgroundImage: `url(${sheet})`,
                backgroundSize: "auto"
            }}/>
        </div>
    )
}