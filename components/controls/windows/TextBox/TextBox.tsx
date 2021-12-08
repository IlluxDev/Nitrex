import { Props } from "../../shared/TextBox/Props";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Styles.module.scss";
import { Icon } from "@iconify/react";
import { TextBlock } from "../TextBlock/TextBlock";
import { Glass } from "../Glass/Glass";
import { routeManager } from "../../../Components";

export function TextBox(props: Props) {
    const [clearButtonVisible, setClearButtonVisibleState] = useState(false);
    const [dropDownHeight, setDropDownHeightState] = useState("0px");
    const [inputWidth, setInputWidthState] = useState("0px");
    const [dropDownOpened, setDropDownOpenedState] = useState(false);
    const inputRef = useRef(null);
    const dropDownInnerRef = useRef(null);
    const inputWrapperRef = useRef(null);

    useEffect(() => {
        new ResizeObserver(() => {
            setDropDownHeightState(dropDownInnerRef.current.offsetHeight + "px");
        }).observe(dropDownInnerRef.current);
    }, [dropDownInnerRef]);

    useEffect(() => {
        new ResizeObserver(() => {
            setInputWidthState(inputWrapperRef.current.offsetWidth + "px");
        }).observe(inputWrapperRef.current);
    }, [inputWrapperRef]);

    return (
        <div className={styles.root}>
            <div ref={inputWrapperRef} className={`${styles.input} ${styles.inputSearch}`}>
                <input
                    onFocus={() => {
                        setDropDownOpenedState(true);  
                    }}
                    onBlur={() => {
                        setDropDownOpenedState(false);
                    }}
                    onKeyUp={key => {
                        if (key.key == "Enter") {
                            if (props.onSubmit && props.submit) {
                                props.onSubmit(inputRef.current.value);
                            }
                        }
                    }}
                    ref={inputRef}
                    onInput={e => {
                        if (props.onInput) {
                            props.onInput(inputRef.current.value);
                        }

                        if ((e.target as HTMLInputElement).value.length != 0) {
                            setClearButtonVisibleState(true);
                            return;
                        }

                        setClearButtonVisibleState(false);
                    }}
                    placeholder={props.placeholder}
                    type={props.type == "password" ? "password" : "text"}
                />

                { clearButtonVisible ? <button onClick={() => {
                    inputRef.current.value = "";
                    setClearButtonVisibleState(false);
                    inputRef.current.focus();

                    props.onInput && props.onInput("");
                }}>
                    <Icon icon={"fluent:dismiss-16-regular"} />
                </button> : null }

                { clearButtonVisible && props.type == "search" ? <button>
                    <Icon icon={"fluent:search-16-regular"} />
                </button> : null }
            </div>

            <div style={{
                height: dropDownHeight,
                width: inputWidth
            }} onMouseDown={() => setDropDownOpenedState(true)} className={`${styles.dropDown} ${!dropDownOpened && props.dropdown ? styles.dropDownClosed : (!props.dropdown && styles.dropDownClosed)}`}>
                <Glass className={styles.dropDownGlass} />
                <div className={styles.dropDownGlassTint}></div>
                
                <div ref={dropDownInnerRef} className={`${styles.dropDownInner} ${!dropDownOpened && props.dropdown ? styles.dropDownInnerClosed : (!props.dropdown ? styles.dropDownInnerClosed : {})}`}>
                    {props.dropdown && props.dropdown?.map(item => {
                        return (
                            <div onClick={() => {
                                if (typeof item.action == "function") {
                                    item.action();
                                } else if (typeof item.action == "string") {
                                    routeManager.navigateRoute(item.action);
                                }
                            }} className={styles.dropDownItem}>
                                <div className={styles.dropDownItemIcon}>
                                    ICN
                                </div>

                                <div className={styles.dropDownItemLabel}>
                                    <span>{item.label}</span>
                                    {item.description && <span>{item.description}</span>}
                                </div>
                            </div>
                        );
                    })}

                    {props.dropdown && props.dropdown.length == 0 && 
                        <div className={`${styles.dropDownItem}`}>
                            <div className={styles.dropDownItemLabel}>
                                <span>No Results Found</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
