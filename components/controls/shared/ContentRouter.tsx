import { Props } from "./ContentRouter/Props";
import React, { useState } from "react";
import { routeManager } from "./ContentRouter/RouteManager";

let onRouteChange: (routeName: string) => void = null;

routeManager.on("routeChange", name => {
    onRouteChange ? onRouteChange(name) : null;
});

export function ContentRouter(props: Props) {
    const [routeName, setRouteNameState] = useState("main");

    onRouteChange = (name) => {
        console.log(name);
        setRouteNameState(name);
    };

    return (
        <div>{routeName}{props.routes.find(route => route.name == routeName).builder({})}</div>
    );
}
