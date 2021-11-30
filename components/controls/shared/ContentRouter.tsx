import { Props } from "./ContentRouter/Props";
import { Route, Routes } from "react-router-dom";
import React from "react";

export function ContentRouter(props: Props) {
    return (
        <Routes>
            {props.routes.map((route) => {
                return <Route key={"_router_" + route.path} path={route.path} element={route.element}/>;
            })}
        </Routes>
    );
}
