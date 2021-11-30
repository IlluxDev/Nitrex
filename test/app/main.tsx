import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
    App,
    Button,
    ContentRouter,
    defaultDarkTheme,
    FlexPanel,
    Glass,
    renderer, RouteLink,
    themeManager,
    TitleBar,
    ToggleButton
} from "@illuxdev/nitrex-components";

themeManager.installTheme(defaultDarkTheme);
renderer.setPageZoom(1);

function View() {
    const [disableButtons, setDisableButtonsState] = useState(false);
    const [toggleDisabled, setToggle] = useState(false);

    return (
        <FlexPanel spacing={20}>
            <Glass style={{
                width: "calc(100vw / 1.2)",
                height: "calc(100vh / 1.2)",
                position: "fixed",
                top: "50vh",
                left: "50vw",
                resize: "both",
                transform: "translate(-50%, -50%)",
                borderRadius: "8px"
            }}/>

            <Button disabled={disableButtons} primary>Button</Button>
            <ToggleButton disabled={toggleDisabled} onToggle={setDisableButtonsState}>Disable All Buttons</ToggleButton>
            <ToggleButton onToggle={setToggle}>Disable Toggle Button</ToggleButton>
        </FlexPanel>
    )
}

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
                <View />
                <FlexPanel spacing={10}>
                    <RouteLink href={"/"}>Home</RouteLink>
                    <RouteLink href={"/cats"}>Cute Kitties</RouteLink>
                </FlexPanel>
            </FlexPanel>
        </App>
    </React.StrictMode>,
    document.getElementById("root")
);
