import { CSSProperties } from "react";

export interface Props {
    href: string;
    children: string;
    styles?: CSSProperties;
    className?: string;
}