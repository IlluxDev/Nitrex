import { Props } from "./TextBlock/Props";
import { TextBlock as WindowsTextBlock } from "../windows/TextBlock/TextBlock";
import React from "react";

export function TextBlock(props: Props) {
    return <WindowsTextBlock {...props} />;
}
