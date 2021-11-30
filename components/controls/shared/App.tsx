import React from "react";
import { Props } from "./App/Props";
import { BrowserRouter } from "react-router-dom";

export function App(props: Props) {
    return (
        <div>
            <BrowserRouter>{props.children}</BrowserRouter>
        </div>
    );
}
