import { Props } from "../../shared/TextBox/Props";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Styles.module.scss";
import { Icon } from "@iconify/react";
import { Glass } from "../Glass/Glass";
import { routeManager } from "../../../Components";

export function TextBox(props: Props) {
    const [clearButtonVisible, setClearButtonVisibleState] = useState(false);
    const [dropDownHeight, setDropDownHeightState] = useState("0px");
    const [inputWidth, setInputWidthState] = useState("0px");
    const [dropDownOpened, setDropDownOpenedState] = useState(false);
    const [currentDropDownItem, setCurrentDropDownItemState] = useState(-1);
    const inputRef = useRef(null);
    const dropDownInnerRef = useRef(null);
    const inputWrapperRef = useRef(null);

    if (dropDownInnerRef.current && dropDownInnerRef.current.offsetHeight + "px" != dropDownHeight) {
        setDropDownHeightState(dropDownInnerRef.current.offsetHeight + "px");
    }
    
    if (inputWrapperRef.current && inputWrapperRef.current.offsetWidth + "px" != inputWidth) {
        setInputWidthState(inputWrapperRef.current.offsetWidth + "px");
    }

    useEffect(() => {
        setDropDownHeightState(dropDownInnerRef.current.offsetHeight + "px");
        console.log(dropDownInnerRef.current.offsetHeight + "px");

        new ResizeObserver(() => {
            setDropDownHeightState(dropDownInnerRef.current.offsetHeight + "px");
            console.log(dropDownInnerRef.current.offsetHeight + "px");
        }).observe(dropDownInnerRef.current);
    }, [dropDownInnerRef]);

    useEffect(() => {
        setInputWidthState(inputWrapperRef.current.offsetWidth + "px");

        new ResizeObserver(() => {
            setInputWidthState(inputWrapperRef.current.offsetWidth + "px");
        }).observe(inputWrapperRef.current);
    }, [inputWrapperRef]);

    useEffect(() => {
        setDropDownHeightState(dropDownInnerRef.current.offsetHeight + "px");
        setInputWidthState(inputWrapperRef.current.offsetWidth + "px");
    }, [open]);

    return (
        <div className={styles.root}>
            <div ref={inputWrapperRef} className={`${styles.input} ${props.type == "search" && dropDownOpened ? styles.inputSearch : {}}`}>
                <input
                    onFocus={() => {
                        setDropDownOpenedState(true);  
                    }}
                    onBlur={e => {
                        setDropDownOpenedState(false);
                    }}
                    onKeyUp={key => {
                        if (key.key == "Enter") {
                            if (currentDropDownItem == -1 && props.onSubmit && props.submit) {
                                props.onSubmit(inputRef.current.value);
                            } else if (currentDropDownItem != -1) {
                                const itemAction = (props.dropdown as Props["dropdown"])[currentDropDownItem].action;
                                
                                if (typeof itemAction == "string") {
                                    routeManager.navigateRoute(itemAction);
                                } else if (typeof itemAction == "function") {
                                    itemAction();
                                }

                                inputRef.current.blur();
                            }
                        }

                        if (key.key == "ArrowDown") {
                            key.preventDefault();

                            setCurrentDropDownItemState(state => {
                                if (state + 1 > (props.dropdown as any).length - 1) {
                                    return 0;
                                }

                                return state + 1;
                            });
                        }

                        if (key.key == "ArrowUp") {
                            key.preventDefault();

                            setCurrentDropDownItemState(state => {
                                if (state - 1 < 0) {
                                    return (props.dropdown as any).length - 1;
                                }

                                return state - 1;
                            });
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
            }} onMouseEnter={() => {
                inputRef.current.focus();
            }} onMouseLeave={() => {
                inputRef.current.focus();
            }} onMouseDown={() => inputRef.current.focus()} className={`${styles.dropDown} ${!dropDownOpened && props.dropdown ? styles.dropDownClosed : (!props.dropdown && styles.dropDownClosed)}`}>
                <Glass className={styles.dropDownGlass} />
                <div className={styles.dropDownGlassTint}></div>
                
                <div ref={dropDownInnerRef} className={`${styles.dropDownInner} ${!dropDownOpened && props.dropdown ? styles.dropDownInnerClosed : (!props.dropdown ? styles.dropDownInnerClosed : {})}`}>
                    {props.dropdown && props.dropdown?.map((item, index) => {
                        return (
                            <div onClick={() => {
                                if (typeof item.action == "function") {
                                    item.action();
                                } else if (typeof item.action == "string") {
                                    routeManager.navigateRoute(item.action);
                                }

                                setDropDownOpenedState(false);
                            }} className={`${styles.dropDownItem} ${currentDropDownItem == index ? styles.dropDownItemCurrent : {}}`}>
                                <div className={styles.dropDownItemIcon}>
                                    {currentDropDownItem == index ? ">" : "0"}
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
