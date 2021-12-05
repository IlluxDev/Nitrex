import React from "react";
import { themeManager } from "../ThemeManager";
import { Button as WindowsButton } from "../windows/Button/Button";
import { Button as MacButton } from "../mac/Button/Button";
import { Props } from "./Button/Props";

export function Button(props: Props): JSX.Element {
    switch (themeManager.getOs()) {
        case "windows":
            return <WindowsButton {...props} />;

        case "linux":
            return null;

        case "mac":
            return <MacButton {...props} />;
    }
}
