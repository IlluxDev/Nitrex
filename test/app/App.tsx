import { useState } from 'react'
import './App.css'
import { Button, defaultDarkTheme, FlexPanel, themeManager } from "@illuxdev/nitrex-components";

function App() {
    const [count, setCount] = useState(0);

    themeManager.installTheme(defaultDarkTheme);

    return (
        <FlexPanel direction={"horizontal"} spacing={10} padding={10}>
            <Button>Button</Button>
            <Button primary>Button</Button>
        </FlexPanel>
    )
}

export default App
