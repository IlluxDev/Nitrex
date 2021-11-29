import { ThemeProps as WindowsThemeProps } from "./windows/ThemeProps";

export function generateThemeCss(theme: WindowsThemeProps, format: boolean = false): string {
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