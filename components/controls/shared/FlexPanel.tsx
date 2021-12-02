import { Props } from "./FlexPanel/Props";
import styles from "./FlexPanel/Styles.module.scss";
import React from "react";

export function FlexPanel(props: Props) {
	return (
		<div
			className={`${styles.root}`}
			style={{
				flexDirection:
					props.direction == "horizontal" ? "row" : "column",
				gap: (props.spacing ?? 0) + "px",
				padding: (props.padding ?? 0) + "px",
				...props.style ?? {}
			}}
		>
			{props.children}
		</div>
	);
}
