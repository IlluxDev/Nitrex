import { Props } from "./TitleBar/Props";
import { TitleBar as WindowsTitleBar } from "../windows/TitleBar/TitleBar";
import React from "react";

export function TitleBar(props: Props) {
    return (
        <WindowsTitleBar {...props} />
    )
}