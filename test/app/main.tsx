import React, { CSSProperties, useEffect, useRef } from "react";
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
    ToggleButton,
    windowsWindowEffects as windowEffects,
    Button,
    TitleBar,
} from "@illuxdev/nitrex-components";
import "./index.css";

renderer.setPageZoom(1);
themeManager.setOs((localStorage.getItem("os") as any) ?? "windows");
themeManager.installTheme(defaultDarkTheme);

if (!localStorage.getItem("os")) {
    localStorage.setItem("os", "windows");
}

function Cats() {
    return (
        <div>
            <TextBlock header={4}>Here Are Some Cat Pictures</TextBlock>
        </div>
    );
}

function Home() {
    return (
        <FlexPanel padding={20} spacing={10}>
            <TextBlock header={6}>Enable Dark Theme</TextBlock>
            <ToggleButton
                onToggle={(useDark) => {
                    if (useDark) {
                        themeManager.installTheme(defaultDarkTheme);
                        return;
                    }

                    themeManager.installTheme(defaultLightTheme);
                }}
            >
                Dark Theme
            </ToggleButton>
            <Button>Test</Button>
        </FlexPanel>
    );
}

function Settings() {
    return (
        <FlexPanel
            style={{
                maxWidth: "250px",
                flexGrow: "0%",
            }}
            spacing={10}
        >
            <TextBlock header={6}>Enable Dark Theme</TextBlock>
            <ToggleButton
                onToggle={(useDark) => {
                    if (useDark) {
                        themeManager.installTheme(defaultDarkTheme);
                        return;
                    }

                    themeManager.installTheme(defaultLightTheme);
                }}
            >
                Dark Theme
            </ToggleButton>

            <br />
            <TextBlock header={6}>Enable Mica Effect</TextBlock>
            <ToggleButton
                onToggle={(micaMode) => {
                    if (micaMode) {
                        windowEffects.applyEffect("mica");
                        return;
                    }

                    windowEffects.applyEffect(false);
                }}
            >
                Mica Effect
            </ToggleButton>

            <br />
            <TextBlock header={6}>Full Color Palette</TextBlock>

            <div
                style={{
                    maxHeight: "400px",
                    width: "calc(100vw - 20px)",
                    overflow: "auto",
                }}
            >
                {
                    Object.keys(defaultLightTheme).map((themeItem) => {
                        return (
                            <div
                                key={themeItem}
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    color: "var(--fill_text_primary)",
                                }}
                            >
                                <div
                                    style={{
                                        width: "10px",
                                        height: "10px",
                                        background: `var(--${themeItem})`,
                                        border: "1px solid #000",
                                    }}
                                />

                                <div>{themeItem}</div>
                            </div>
                        );
                    }) as any
                }
            </div>
        </FlexPanel>
    );
}

const navLinkStyle: CSSProperties = {
    color: "var(--fill_accent_default)",
    textDecoration: "none",
    paddingBottom: "5px",
    borderBottom: "1px solid var(--fill_accent_default)",
};

function Com() {
    return (
        <NavigationView
            search={true}
            settings={true}
            content={[
                {
                    label: "Home",
                    action: "/",
                    icon: "fluent:home-16-regular",
                },
                {
                    label: "Cats",
                    action: "/cats",
                    icon: "fluent:animal-cat-16-regular",
                },
                {
                    divider: true,
                    label: "Misc",
                    hideDivider: true
                },
                {
                    label: "Illux GitHub",
                    icon: "akar-icons:github-fill",
                    items: [
                        {
                            label: "Nitrex",
                            action() {
                                renderer.openExternal(
                                    "https://github.com/IlluxDev/Nitrex"
                                );
                            }
                        },
                        {
                            label: "Exolix",
                            action() {
                                renderer.openExternal(
                                    "https://github.com/IlluxDev/Exolix"
                                );
                            },
                        }
                    ]
                },
            ]}
            displayMode={"left"}
        >
            <ContentRouter
                routes={[
                    {
                        path: "/cats",
                        element: <Cats />,
                    },
                    {
                        path: "/settings",
                        element: <Settings />,
                    },
                    {
                        path: "/",
                        element: <Home />,
                    },
                ]}
            />
        </NavigationView>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App baseBackground={false}>
            <Com />
        </App>
    </React.StrictMode>,
    document.getElementById("root")
);
