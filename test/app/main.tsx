import React, { CSSProperties, useEffect, useRef, useState } from "react";
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
themeManager.installTheme(localStorage.getItem("theme") == "light" ? defaultLightTheme : defaultDarkTheme);

if (!localStorage.getItem("os")) {
    localStorage.setItem("os", "windows");
}

let initRender = false;

function Cats() {
    const [catSource, setCat] = useState("");
    const [loading, setLoading] = useState(false);
    const [downloading, setDl] = useState(false);

    function renderNewCat() {
        console.log("[KITTY ENGINE] Rendering a new cat!! Meoww");
        const fetchRes = fetch("https://api.mythicalkitten.com/cats");
        setLoading(true);

        fetchRes.then(res => {
            res.json().then(newRes => {
                setCat(newRes.url);
                setLoading(false);
            });
        }).catch(() => {
            setCat("err");
        });
    }

    function storeCat() {
        setDl(true);
        fetch(catSource).then(res => {
            res.blob().then(rawBlob => {
                const dataObj = URL.createObjectURL(rawBlob);

                const link = document.createElement('a')
                link.href = dataObj;
                link.download = 'Cute Catz'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                setDl(false);
            });
        });
    }

    if (!initRender) {
        initRender = true;
        renderNewCat();
    }

    return (
        <div>
            <TextBlock header={4}>Here Are Some Cat Pictures</TextBlock>
            <br />
            <FlexPanel spacing={20}>
                <FlexPanel direction={"horizontal"} spacing={10}>
                    <Button onClick={renderNewCat}>Show Me a Cat</Button>
                    <Button primary onClick={storeCat}>Download Cat</Button>
                </FlexPanel>

                { !loading ? <img style={{
                    borderRadius: "8px",
                    maxWidth: "500px"
                }} alt={"Nuuu: I couldn't get that cat, try again"} src={catSource} /> : <TextBlock>Loading Kitty Cat...</TextBlock> }
            </FlexPanel>
        </div>
    );
}

function Home() {
    return (
        <FlexPanel padding={0} spacing={10}>
            <TextBlock header={6}>Enable Dark Theme</TextBlock>
            <ToggleButton
                default={localStorage.getItem("theme") == "dark" || !localStorage.getItem("theme")}
                onToggle={(useDark) => {
                    localStorage.setItem("theme", useDark ? "dark" : "light")

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
                default={localStorage.getItem("theme") == "dark" || !localStorage.getItem("theme")}
                onToggle={(useDark) => {
                    localStorage.setItem("theme", useDark ? "dark" : "light")

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
                    action: "main",
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
                    hideDivider: false
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
                {
                    label: "Animals",
                    items: [
                        {
                            label: "Cats",
                            action: "/cats"
                        },
                        {
                            label: "Fox",
                            action: "/foxes"
                        }
                    ]
                },
                {
                    label: "Tests",
                    divider: true
                },
                {
                    label: "Button",
                    action: "/tests/button"
                }
            ]}
            displayMode={"left"}
        >
            <ContentRouter
                routes={[
                    {
                        name: "main",
                        builder: () => <Home />,
                    },
                    {
                        name: "/cats",
                        builder: () => <Cats />,
                    },
                    {
                        name: "/settings",
                        builder: () => <Settings />,
                    }
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
