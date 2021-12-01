import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
    App,
    Button,
    ContentRouter,
    defaultLightTheme,
    FlexPanel,
    renderer,
    RouteLink,
    TextBlock,
    TextBox,
    themeManager,
    TitleBar,
    ToggleButton
} from "@illuxdev/nitrex-components";

themeManager.installTheme({
    ...defaultLightTheme,
    ...{
        fill_accent_default: "#dd9de7",
        fill_accent_secondary: "rgba(221,157,231,0.93)",
        fill_accent_tertiary: "rgba(221,157,231,0.89)"
    }
});

renderer.setPageZoom(1);

function View() {
    const [disableButtons, setDisableButtonsState] = useState(false);
    const [toggleDisabled, setToggle] = useState(false);

    return (
        <FlexPanel spacing={20}>
            <TextBlock header={1}>Button Tests</TextBlock>
            <TextBlock header={2}>Button Tests</TextBlock>
            <TextBlock header={3}>Button Tests</TextBlock>
            <TextBlock header={4}>Button Tests</TextBlock>
            <TextBlock header={5}>Button Tests</TextBlock>
            <TextBlock header={6}>Button Tests</TextBlock>
            <TextBlock>Button Tests</TextBlock>

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
                    element: <TextBlock header={4}>Home</TextBlock>
                }
            ]}/>

            <FlexPanel direction={"horizontal"} padding={20} spacing={20}>
                <View />
                <FlexPanel spacing={10}>
                    <RouteLink href={"/"}>Home</RouteLink>
                    <RouteLink href={"/cats"}>Cute Kitties</RouteLink>
                    <TextBox placeholder={"Some Place Holder"}/>
                </FlexPanel>
            </FlexPanel>
        </App>
    </React.StrictMode>,
    document.getElementById("root")
);
