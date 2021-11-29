const theme = "dark" as "dark" | "light";

const config = {
    fill: {
        text: {
            primary: "",
            secondary: "",
            tertiary: "",
            disabled: ""
        },
        accentText: {
            primary: "",
            secondary: "",
            tertiary: "",
            disabled: ""
        },
        textOnAccent: {
            primary: "",
            secondary: "",
            disabled: "",
            selectedText: ""
        },
        control: {
            transparent: "",
            default: "",
            secondary: "",
            tertiary: "",
            disabled: "",
            inputActive: ""
        },
        controlStrong: {
            default: "",
            disabled: ""
        },
        controlAlt: {
            primary: "",
            secondary: "",
            tertiary: "",
            quarternary: "",
            disabled: ""
        },
        subtle: {
            transparent: "",
            secondary: "",
            tertiary: "",
            disabled: ""
        },
        accent: {
            default: "",
            secondary: "",
            tertiary: "",
            disabled: "",
            selectedTextBackground: ""
        },
        controlSolid: {
            default: ""
        },
        system: {
            critical: "",
            success: "",
            attention: "",
            caution: "",
            attentionBackground: "",
            successBackground: "",
            cautionBackground: "",
            criticalBackground: "",
            neutral: "",
            neutralBackground: "",
            solidAttentionBackground: "",
            solidNeutral: "",
            solidNeutralBackground: ""
        }
    }
}

const getUiTheme: () => typeof theme = () => {
    return theme;
}

export { getUiTheme };