import { Props } from "./Glass/Glass";
import { Glass as WindowsGlass } from "../windows/Glass/Glass";
import React from "react";

export function Glass(props: Props) {
    return (
        <WindowsGlass {...props} />
    )
}