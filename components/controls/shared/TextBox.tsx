import { Props } from "./TextBox/Props";
import React from "react";
import { TextBox as WindowsTextBox } from "../windows/TextBox/TextBox";

export function TextBox(props: Props) {
    return (<WindowsTextBox {...props} />)
}