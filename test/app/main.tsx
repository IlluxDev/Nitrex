import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import {
    App,
    ContentRouter,
    defaultDarkTheme,
    defaultLightTheme,
    FlexPanel,
    NavigationView,
    renderer,
    TextBlock,
    themeManager,
    ToggleButton
} from "@illuxdev/nitrex-components";
import "./index.css";
import { windowEffects } from "@illuxdev/nitrex-components/utils/windows/WindowEffects";

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
        <FlexPanel padding={20}>
            <TextBlock header={6}>Enable Dark Theme</TextBlock>
            <ToggleButton onToggle={useDark => {
                if (useDark) {
                    themeManager.installTheme(defaultDarkTheme);
                    return;
                }

                themeManager.installTheme(defaultLightTheme);
            }}>Dark Theme</ToggleButton>
        </FlexPanel>
    )
}

function Settings() {
    return (
        <FlexPanel style={{
            maxWidth: "250px",
            flexGrow: "0%"
        }} spacing={10}>
            <TextBlock header={6}>Enable Dark Theme</TextBlock>
            <ToggleButton onToggle={useDark => {
                if (useDark) {
                    themeManager.installTheme(defaultDarkTheme);
                    return;
                }

                themeManager.installTheme(defaultLightTheme);
            }}>Dark Theme</ToggleButton>

            <br/>
            <TextBlock header={6}>Enable Mica Effect</TextBlock>
            <ToggleButton onToggle={micaMode => {
                if (micaMode) {
                    windowEffects.applyEffect("mica");
                    return;
                }

                windowEffects.applyEffect(false);
            }}>Mica Effect</ToggleButton>

            <br/>
            <TextBlock header={6}>Full Color Palette</TextBlock>

            <div style={{
                maxHeight: "400px",
                width: "calc(100vw - 20px)",
                overflow: "auto"
            }}>
                {Object.keys(defaultLightTheme).map(themeItem => {
                    return (
                        <div key={themeItem} style={{
                            display: "flex",
                            gap: "10px",
                            color: "var(--fill_text_primary)"
                        }}>
                            <div style={{
                                width: "10px",
                                height: "10px",
                                background: `var(--${themeItem})`,
                                border: "1px solid #000"
                            }}/>

                            <div>{themeItem}</div>
                        </div>
                    )
                }) as any}
            </div>
        </FlexPanel>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <App baseBackground={false}>
            <NavigationView displayMode={"left"}>
                <ContentRouter routes={[
                    {
                        path: "/cats",
                        element: <Cats/>
                    },
                    {
                        path: "/settings",
                        element: <Settings/>
                    },
                    {
                        path: "/",
                        element: <Home/>
                    }
                ]}/>
            </NavigationView>
        </App>
    </React.StrictMode>,
    document.getElementById("root")
);
