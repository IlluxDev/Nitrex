import { Button } from "../Button/Button";
import { Props } from "../../shared/ToggleButton/Props";
import React, { useState } from "react";

export function ToggleButton(props: Props) {
    const [toggled, setToggledState] = useState(props.default);

    return (
        <Button
            disabled={props.disabled}
            onClick={() => {
                if (toggled) {
                    setToggledState(false);
                } else {
                    setToggledState(true);
                }

                if (props.onToggle) {
                    props.onToggle(!toggled);
                }
            }}
            primary={toggled}
        >
            {props.children}
        </Button>
    );
}
