import React from "react";
import { Button as WindowsButton } from "../windows/Button/Button";
import { Props as ButtonProps } from "./Button/Props";

export function Button(props: ButtonProps) {
    return (
        <WindowsButton {...props} />
    )
}