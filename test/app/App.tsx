import { useState } from 'react'
import './App.css'
import { Button, themeManager } from "@illuxdev/nitrex-components";

function App() {
    const [count, setCount] = useState(0);

    themeManager.installTheme({
        background_acrylicBackground_base: "aosdjioajd",
        background_cardBackground_secondary: "asdasdas",
        background_acrylicBackground_default: "sdfsdf"
    });

    return (
        <div>
            <Button>Hello</Button>
        </div>
    )
}

export default App
