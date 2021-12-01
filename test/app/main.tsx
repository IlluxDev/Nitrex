import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import {
    App,
    ContentRouter,
    defaultDarkTheme,
    FlexPanel,
    renderer,
    RouteLink,
    TextBlock,
    themeManager,
    TitleBar
} from "@illuxdev/nitrex-components";
import "./index.css";

renderer.setPageZoom(1);
themeManager.installTheme(defaultDarkTheme);

function Cats() {
    return (
        <div>
            <TextBlock header={4}>Here Are Some Cat Pictures</TextBlock>
        </div>
    )
}

function Home() {
    return (
        <div>
            <TextBlock header={4}>Welcome To The Nitrex Demo App</TextBlock>
        </div>
    )
}

const navLinkStyle: CSSProperties = {
    color: "#60CDFF",
    textDecoration: "none",
    borderBottom: "1px solid #60CDFF"
};

ReactDOM.render(
    <React.StrictMode>
        <App>
            <TitleBar/>

            <FlexPanel padding={10}>
                <FlexPanel direction={"horizontal"} spacing={10}>
                    <RouteLink style={navLinkStyle} href={"/"}>Home</RouteLink>
                    <RouteLink style={navLinkStyle} href={"/cats"}>Cats</RouteLink>
                </FlexPanel>

                <br/>

                <ContentRouter routes={[
                    {
                        path: "/cats",
                        element: <Cats/>
                    },
                    {
                        path: "/",
                        element: <Home/>
                    }
                ]}/>
            </FlexPanel>
        </App>
    </React.StrictMode>,
    document.getElementById("root")
);
