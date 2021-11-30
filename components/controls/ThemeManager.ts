import { ThemeProps as WindowsThemeProps } from "./windows/ThemeProps";

class ThemeManager {
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
}

const themeManager = new ThemeManager();
export { themeManager };
