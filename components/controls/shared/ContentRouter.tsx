import { Props } from "./ContentRouter/Props";
import { Route, Routes, useLocation } from "react-router-dom";
import React, { useEffect } from "react";

export function ContentRouter(props: Props) {
    const location = useLocation();

    useEffect(() => {
        alert("E")
    }, [location]);

    return (
        <Routes>
            {props.routes.map((route) => {
                return <Route key={"_router_" + route.path} path={route.path} element={route.element}/>;
            })}
        </Routes>
    );
}
