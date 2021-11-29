import { useState } from 'react'
import './App.css'
import { Button } from "@illuxdev/nitrex-components";
import { generateThemeCss } from "@illuxdev/nitrex-components/controls/GenerateTheme";

function App() {
    const [count, setCount] = useState(0);

    console.log(generateThemeCss({
        background_acrylicBackground_base: "aosdjioajd",
        background_cardBackground_secondary: "asdasdas",
        background_acrylicBackground_default: "sdfsdf"
    }, true));

    return (
        <div>
            <Button>Hello</Button>
        </div>
    )
}

export default App
