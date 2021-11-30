import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
    App,
    ContentRouter,
    defaultDarkTheme,
    FlexPanel,
    renderer,
    RouteLink,
    themeManager,
    TitleBar
} from "@illuxdev/nitrex-components";

themeManager.installTheme(defaultDarkTheme);
renderer.setPageZoom(1);

ReactDOM.render(
    <React.StrictMode>
        <App>
            <TitleBar/>

            <ContentRouter routes={[
                {
                    path: "/cats",
                    element: <span>Cats</span>
                },
                {
                    path: "/",
                    element: <span>Home</span>
                }
            ]}/>

            <FlexPanel direction={"horizontal"} padding={20} spacing={20}>
                <RouteLink href={"/"}>Home</RouteLink>
                <RouteLink href={"/cats"}>Cats</RouteLink>
            </FlexPanel>
        </App>
    </React.StrictMode>,
    document.getElementById("root")
);
