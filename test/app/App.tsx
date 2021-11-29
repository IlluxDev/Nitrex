import { useState } from 'react'
import './App.css'
import { Button, defaultDarkTheme, FlexPanel, themeManager } from "@illuxdev/nitrex-components";

function App() {
    const [count, setCount] = useState(0);

    themeManager.installTheme({
        ...defaultDarkTheme,
        ...{
            fill_accent_default: "#dd9de7",
            fill_accent_secondary: "rgba(221,157,231,0.88)",
            fill_accent_tertiary: "rgba(221,157,231,0.79)"
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
