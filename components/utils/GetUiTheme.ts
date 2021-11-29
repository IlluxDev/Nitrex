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
        },
        controlOnImage: {
            default: "",
            secondary: "",
            tertiary: "",
            disabled: ""
        }
    },
    elevation: {
        control: {
            border: ""
        },
        circle: {
            border: ""
        },
        textControl: {
            border: "",
            borderFocused: ""
        },
        accentControl: {
            border: ""
        }
    },
    strokeColor: {
        controlStroke: {
            default: "",
            onAccentDefault: "",
            secondary: "",
            onAccentSecondary: "",
            onAccentTertiary: "",
            onAccentDisabled: "",
            forStrongFillWhenOnImage: ""
        },
        controlStrongStroke: {
            default: "",
            disabled: ""
        },
        dividerStroke: {
            default: ""
        },
        surfaceStroke: {
            default: "",
            flyout: ""
        },
        cardStroke: {
            default: "",
            defaultSolid: ""
        },
        focusStroke: {
            outer: "",
            inner: ""
        }
    },
    background: {
        cardBackground: {
            default: "",
            secondary: ""
        },
        smoke: {
            default: ""
        },
        solidBackground: {
            base: "",
            secondary: "",
            tertiary: "",
            quarternary: ""
        },
        micaBackground: {
            base: ""
        },
        acrylicBackground: {
            default: "",
            base: ""
        },
        layer: {
            default: "",
            alt: ""
        },
        layerOnAcrylic: {
            default: ""
        },
        layerOnAccentAcrylic: {
            default: ""
        }
    }
}

const getUiTheme: () => typeof theme = () => {
    return theme;
}

export { getUiTheme };