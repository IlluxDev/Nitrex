import { ToggleButton as WindowsToggleButton } from "../windows/ToggleButton/ToggleButton";
import { Props } from "./ToggleButton/Props";
import React from "react";

export function ToggleButton(props: Props) {
    return (
        <WindowsToggleButton {...props} />
    )
}