import { Props } from "../../shared/TextBox/Props";
import React, { useRef, useState } from "react";
import styles from "./Styles.module.scss";
import { Icon } from "@iconify/react";

export function TextBox(props: Props) {
    const [clearButtonVisible, setClearButtonVisibleState] = useState(false);
    const inputRef = useRef(null);

    return (
        <div className={styles.root}>
            <div className={styles.input}>
                <input
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
                }}>
                    <Icon icon={"fluent:dismiss-16-regular"} />
                </button> : null }

                { clearButtonVisible && props.type == "search" ? <button>
                    <Icon icon={"fluent:search-16-regular"} />
                </button> : null }
            </div>
        </div>
    );
}
