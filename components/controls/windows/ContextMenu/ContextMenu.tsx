import { Icon } from "@iconify/react";
import React from "react";
import { Props } from "../../shared/ContextMenu/Props";
import { Glass } from "../Glass/Glass";
import styles from "./Styles.module.scss";

export function ContextMenu(props: Props) {
    return (
        <div className={styles.root}>
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