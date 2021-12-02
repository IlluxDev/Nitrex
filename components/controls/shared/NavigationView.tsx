import { Props } from "./NavigationView/Props";
import React from "react";
import { NavigationView as WindowsNavigationView } from "../windows/NavigationView/NavigationView";

export function NavigationView(props: Props) {
    return (
        <WindowsNavigationView {...props} />
    )
}