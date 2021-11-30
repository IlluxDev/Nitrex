import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App, ContentRouter } from "@illuxdev/nitrex-components";

ReactDOM.render(
    <React.StrictMode>
        <App>
            <ContentRouter routes={[
                {
                    path: "/cats",
                    element: <p>Cats</p>
                },
                {
                    path: "/",
                    element: <p>Home</p>
                }
            ]}/>


        </App>
    </React.StrictMode>,
    document.getElementById("root")
);
