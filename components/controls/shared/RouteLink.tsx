import { Props } from "./RouteLink/Props";
import { Link } from "react-router-dom";
import React from "react";

export function RouteLink(props: Props) {
    return (
        <Link style={props.styles ?? {}} className={props.className ?? ""} to={props.href}>{props.children}</Link>
    )
}