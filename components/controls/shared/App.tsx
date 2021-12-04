import React, { useState } from "react";
import { Props } from "./App/Props";
import { BrowserRouter } from "react-router-dom";
import { windowsWindowEffects } from "../../Components";

let onMicaModeChange: any | null = null;

setTimeout(() => {
    windowsWindowEffects.on("modeChange", () => {
        console.log(windowsWindowEffects.getEffect());
        if (windowsWindowEffects.getEffect() == false || windowsWindowEffects.getEffect() == "mica") {
            onMicaModeChange ? onMicaModeChange() : null;
        }
    });
}, 1000);

export function App(props: Props) {
    const [usingMica, setUsingMicaState] = useState(windowsWindowEffects.getEffect() == "mica");

    onMicaModeChange = () => {
        setUsingMicaState(windowsWindowEffects.getEffect() == "mica");
    }

    const fallbackBackgroundStyles = (
        props.baseBackground
            ? "var(--background_solidBackground_base)"
            : "var(--background_solidBackground_tertiary)"
    );

    const micaBackground = "rgba(40, 40, 40, 0)";

    return (
        <div style={{
            background: usingMica ? micaBackground : fallbackBackgroundStyles,
            height: "100vh",
            overflow: "auto",
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw"
        }}>
            <BrowserRouter>{props.children}</BrowserRouter>
        </div>
    );
}
