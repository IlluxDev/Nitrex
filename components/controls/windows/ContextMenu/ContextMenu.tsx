import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";
import { renderer } from "../../Renderer";
import { Manager } from "../../shared/ContextMenu/Manager";
import { Props } from "../../shared/ContextMenu/Props";
import { Glass } from "../Glass/Glass";
import styles from "./Styles.module.scss";

export function ContextMenu(props: Props) {
    const [position, setPositionState] = useState({
        left: 100,
        top: 100
    });
    const [innerHeight, setInnerHeightState] = useState(0);
    const [innerWidth, setInnerWidthState] = useState(0);
    const [show, setShowState] = useState(props.show);
    const manager = new Manager();
    const rootRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    const clickListener = e => {
        const target = e.target as HTMLDivElement;
        const rootElement = rootRef.current;
    
        if (target.parentElement == rootElement) {
        } else if (target.parentElement.parentElement == rootElement) {    
        } else if (target.parentElement.parentElement.parentElement == rootElement) {
        } else if (target.parentElement.parentElement.parentElement.parentElement == rootElement) {
        } else if (target.parentElement.parentElement.parentElement.parentElement.parentElement == rootElement) {
        } else {
            if (manager) {
                manager.hide();
            }
        }
    }

    window.addEventListener("mousedown", clickListener);

    useEffect(() => {
        return () => {
            window.removeEventListener("mousedown", clickListener);
        }
    });

    useEffect(() => {
        if (innerRef.current) {
            new ResizeObserver(() => {
                setInnerHeightState(innerRef.current.scrollHeight);
                setInnerWidthState(innerRef.current.scrollWidth);
            }).observe(innerRef.current);
        }
    }, [innerRef]);

    const windowMousePosition = renderer.getMousePosition();

    if (windowMousePosition.left != position.left || windowMousePosition.top != position.top) {
        setPositionState({
            left: windowMousePosition.left,
            top: windowMousePosition.top
        });
    }

    manager.on("open", () => {
        console.log("Please wait...");
        setShowState(true)
    });
    manager.on("close", () => setShowState(false));
    manager.on("move", (position) => setPositionState(position));

    if (props.onManagerReady) {
        props.onManagerReady(manager);
    }

    return (
        <div ref={rootRef} style={{
            top: position.top,
            left: position.left,
            display: show ? "flex" : "none",
            height: innerHeight + "px",
            width: innerWidth + "px"
        }} className={styles.root}>
            <Glass className={styles.glass}></Glass>
            <div className={styles.glassCover}></div>

            <div ref={innerRef} className={styles.inner}>
                <div className={styles.iconButtons}>
                    <button>
                        <Icon icon={"fluent:navigation-16-regular"} />
                    </button>

                    <button>
                        <Icon icon={"fluent:clipboard-16-regular"} />
                    </button>
                </div>

                <div className={styles.buttons}>
                    {props.content?.map(item => {
                        return (
                            <button key={item.label + new Date() + Math.random()}>
                                <div className={styles.buttonIcon}>
                                    O
                                </div>

                                <span className={styles.buttonsButtonText}>{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}