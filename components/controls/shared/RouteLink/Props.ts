import { CSSProperties } from "react";

export interface Props {
    href: string;
    children: string;
    style?: CSSProperties;
    className?: string;
}