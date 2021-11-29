import { useState } from 'react'
import './App.css'
import {
    Button,
    defaultDarkTheme,
    FlexPanel,
    renderer,
    themeManager,
    TitleBar,
    ToggleButton
} from "@illuxdev/nitrex-components";

function App() {
    const [count, setCount] = useState(0);
    const [extendTB, setExtend] = useState(false);

    themeManager.installTheme({
        ...defaultDarkTheme,
        ...{
            fill_accent_default: "#dd9de7",
            fill_accent_secondary: "rgba(221,157,231,0.88)",
            fill_accent_tertiary: "rgba(221,157,231,0.79)"
        }
    });

    renderer.setPageZoom(1);

    return (
        <FlexPanel>
            <TitleBar extendIntoView={extendTB}/>

            <FlexPanel direction={"horizontal"} spacing={20} padding={20}>
                <Button disabled={false}>Test Button</Button>
                <Button primary disabled={false}>Test Button</Button>

                <ToggleButton onToggle={value => setExtend(!value)}>Toggle (Extend TitleBar Into
                    View</ToggleButton>
            </FlexPanel>
        </FlexPanel>
    )
}

export default App
