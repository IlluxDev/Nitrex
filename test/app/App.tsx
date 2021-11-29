import { useState } from 'react'
import './App.css'
import { Button, defaultDarkTheme, FlexPanel, themeManager } from "@illuxdev/nitrex-components";

function App() {
    const [count, setCount] = useState(0);

    themeManager.installTheme({
        ...defaultDarkTheme,
        ...{
            fill_accent_default: "#c9a5fc",
            fill_accent_secondary: "#c9a5fcab",
            fill_accent_tertiary: "#c9a5fc90"
        }
    });

    return (
        <FlexPanel direction={"horizontal"} spacing={10} padding={10}>
            <Button>Button</Button>
            <Button primary disabled>Button</Button>
            <Button primary>Button</Button>
            <Button disabled>Button</Button>
        </FlexPanel>
    )
}

export default App
