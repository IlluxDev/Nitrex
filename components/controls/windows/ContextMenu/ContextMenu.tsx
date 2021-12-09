import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Manager } from "../../shared/ContextMenu/Manager";
import { Props } from "../../shared/ContextMenu/Props";
import { Glass } from "../Glass/Glass";
import styles from "./Styles.module.scss";

export function ContextMenu(props: Props) {
    const [position, setPositionState] = useState({
        left: 100,
        top: 100
    });
    const [show, setShowState] = useState(props.show);
    const manager = new Manager();

    manager.on("open", () => setShowState(true));
    manager.on("close", () => setShowState(false));
    manager.on("move", (position) => setPositionState(position));
    
    if (props.onManagerReady) {
        props.onManagerReady(manager);
    }

    return (
        <div style={{
            top: position.top,
            left: position.left,
            display: show ? "flex" : "none"
        }} className={styles.root}>
            <Glass className={styles.glass}></Glass>
            <div className={styles.glassCover}></div>

            <div className={styles.inner}>
                <div className={styles.iconButtons}>
                    <button>
                        <Icon icon={"fluent:navigation-16-regular"} />
                    </button>

                    <button>
                        <Icon icon={"fluent:clipboard-16-regular"} />
                    </button>
                </div>

                <div className={styles.buttons}>
                    <button>
                        <div className={styles.buttonIcon}>
                            O
                        </div>

                        <span>This is a button #1</span>
                    </button>

                    <button>
                        <div className={styles.buttonIcon}>
                            
                        </div>

                        <span>This is a button #2</span>
                    </button>
                </div>
            </div>
        </div>
    )
}