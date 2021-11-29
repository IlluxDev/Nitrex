const theme = "dark" as "dark" | "light";

const getUiTheme: () => typeof theme = () => {
    return theme;
}

export { getUiTheme };