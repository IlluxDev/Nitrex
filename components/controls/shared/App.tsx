import React from "react";
import { Props } from "./App/Props";
import { BrowserRouter } from "react-router-dom";

export function App(props: Props) {
    const fallbackBackgroundStyles = (
        props.baseBackground
            ? "var(--background_solidBackground_base)"
            : "var(--background_solidBackground_tertiary)"
    );

    return (
        <div style={{
            background: fallbackBackgroundStyles,
            height: "100vh",
            overflow: "auto"
        }}>
            <BrowserRouter>{props.children}</BrowserRouter>
        </div>
    );
}
