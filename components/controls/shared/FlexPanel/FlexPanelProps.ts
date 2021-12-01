import { CSSProperties } from "react";

export interface FlexPanelProps {
    children?: JSX.Element[] | JSX.Element;
    direction?: "horizontal" | "vertical";
    spacing?: number;
    padding?: number;
    style?: CSSProperties;
}
