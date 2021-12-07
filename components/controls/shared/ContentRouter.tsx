import { Props } from "./ContentRouter/Props";
import React, { useState } from "react";
import { routeManager } from "./ContentRouter/RouteManager";
import { TextBlock } from "./TextBlock";

let onRouteChange: (routeName: string) => void = null;

routeManager.on("routeChange", name => {
    onRouteChange ? onRouteChange(name) : null;
});

export function ContentRouter(props: Props) {
    const [routeName, setRouteNameState] = useState(routeManager.getCurrentRouteName());

    onRouteChange = (name) => {
        console.log(name);
        setRouteNameState(name);
    };

    let routeResult = props.routes.find(route => route.name == routeName);
    if (!routeResult) {
        routeResult = props.routes.find(route => route.name == "main");
    }

    if (!routeResult) {
        routeResult = {
            name: "main",
            builder: props => <TextBlock>Failed to load "main" route</TextBlock>
        }
    }

    return (
        <div>{routeResult.builder({})}</div>
    );
}
