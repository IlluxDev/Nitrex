import { useState } from 'react'
import './App.css'
import { Button, defaultDarkTheme, themeManager } from "@illuxdev/nitrex-components";

function App() {
    const [count, setCount] = useState(0);

    themeManager.installTheme(defaultDarkTheme);

    return (
        <div>
            <Button>Hello</Button>
        </div>
    )
}

export default App
