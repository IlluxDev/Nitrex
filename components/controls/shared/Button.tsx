import React from "react";
import { Button as WindowsButton } from "../windows/Button/Button";
import { Props } from "./Button/Props";

export function Button(props: Props) {
    return (
        <WindowsButton {...props} />
    )
}