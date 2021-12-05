import { Props } from "./TitleBar/Props";
import { TitleBar as WindowsTitleBar } from "../windows/TitleBar/TitleBar";
import React from "react";
import { themeManager } from "../ThemeManager";
import { TitleBar as MacTitleBar } from "../mac/TitleBar/TitleBar";

export function TitleBar(props: Props) {
    switch (themeManager.getOs()) {
        case "windows":
            return <WindowsTitleBar {...props} />;

        case "linux":
            return null;

        case "mac":
            return <MacTitleBar {...props} />;
    }
}
