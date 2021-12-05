import { NavigationItemProps } from "./NavigationItemProps";

export interface Props {
    children?: JSX.Element | JSX.Element[];
    displayMode?: "top" | "left";
    settings?: boolean;
    content: NavigationItemProps[];
    footer?: NavigationItemProps[];
    headerContent?: JSX.Element | JSX.Element[];
    search?: boolean;
}
