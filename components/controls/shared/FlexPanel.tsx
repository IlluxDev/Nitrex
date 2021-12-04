import { Props } from "./FlexPanel/Props";
import styles from "./FlexPanel/Styles.module.scss";
import React from "react";

export function FlexPanel(props: Props) {
	let padding = "";
	if (Array.isArray(props.padding)) {
		padding = props.padding.map(side => side + "px").join(" ");
	} else {
		padding = props.padding + "px";
	}

	console.log(padding)

	return (
		<div
			className={`${styles.root}`}
			style={{
				flexDirection:
					props.direction == "horizontal" ? "row" : "column",
				gap: (props.spacing ?? 0) + "px",
				padding,
				...props.style ?? {}
			}}
		>
			{props.children}
		</div>
	);
}
