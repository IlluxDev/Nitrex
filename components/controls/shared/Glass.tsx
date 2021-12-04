import { Props } from "./Glass/Props";
import { Glass as WindowsGlass } from "../windows/Glass/Glass";
import React from "react";

export function Glass(props: Props) {
    return (
        <WindowsGlass {...props} />
    )
}