import React from "react"
import { ContextMenu as WindowsContextMenu } from "../windows/ContextMenu/ContextMenu"
import { Props } from "./ContextMenu/Props"

export function ContextMenu(props: Props) {
    return <WindowsContextMenu {...props} />
}