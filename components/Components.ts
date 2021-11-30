import { ipcController } from "./controls/IpcController";
import { renderer } from "./controls/Renderer";
import { Button } from "./controls/shared/Button";
import { TitleBar } from "./controls/shared/TitleBar";
import { themeManager } from "./controls/ThemeManager";
import { defaultDarkTheme } from "./controls/windows/DefaultDarkTheme";
import { FlexPanel } from "./controls/shared/FlexPanel/FlexPanel";
import { ToggleButton } from "./controls/shared/ToggleButton";
import { App } from "./controls/shared/App";
import { ContentRouter } from "./controls/shared/ContentRouter";
import { RouteLink } from "./controls/shared/RouteLink";
import { Glass } from "./controls/shared/Glass";
import { TextBlock } from "./controls/shared/TextBlock";

if (location.pathname != "/") {
    location.href = "/";
}

export {
    Button,
    FlexPanel,
    TitleBar,
    ToggleButton,
    App,
    ContentRouter,
    RouteLink,
    Glass,
    TextBlock,
    themeManager,
    ipcController,
    renderer,
    defaultDarkTheme,
};
