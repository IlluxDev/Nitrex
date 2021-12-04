import { ThemeProps as WindowsThemeProps } from "./windows/ThemeProps";

class ThemeManager {
    private clientOs: "windows" | "mac" | "linux";

    public constructor() {
        if (navigator.userAgent.indexOf("Windows") != -1) {
            this.clientOs = "windows";
        } else if (navigator.userAgent.indexOf("Linux") != -1) {
            this.clientOs = "linux";
        } else {
            this.clientOs = "mac";
        }
    }

    public generateThemeCss(
        theme: WindowsThemeProps,
        format: boolean = false
    ): string {
        let result = `:root${format ? " { \n" : "{"}`;

        for (const key in theme) {
            if (format) {
                result += `    --${key}: ${theme[key]};\n`;
            } else {
                result += `--${key}:${theme[key]};`;
            }
        }

        return result + "}";
    }

    public setOs(os: "windows" | "linux" | "mac") {
        this.clientOs = os;
    }

    public installTheme(theme: WindowsThemeProps) {
        if (!document) {
            throw new Error("Document is not ready");
        }

        const oldStyle = document.querySelectorAll(
            "head > ._nitrex_installedTheme"
        )[0] as HTMLStyleElement;

        if (oldStyle) {
            oldStyle.remove();
        }

        const newStyle = document.createElement("style") as HTMLStyleElement;

        newStyle.innerHTML = this.generateThemeCss(theme);
        newStyle.className = "_nitrex_installedTheme";

        document.head.appendChild(newStyle);
    }

    public getOs(): "windows" | "linux" | "mac" {
        return this.clientOs;
    }
}

const themeManager = new ThemeManager();
export { themeManager };
