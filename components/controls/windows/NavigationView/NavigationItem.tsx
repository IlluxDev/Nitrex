import { Icon } from "@iconify/react";
import { NavigationItemProps } from "./NavigationItemProps";
import React from "react";
import styles from "./NavigationItem.module.scss";

export function NavigationItem(props: NavigationItemProps) {
    return (
        <div className={styles.root}>
            <div className={`${styles.mainItem} ${!props.sideBarOpened ? styles.mainItemCompact : {}}`} style={{
                paddingLeft: props.sideBarOpened ? (props.inset ? props.inset * 20 : 1) : 0
            }}>
                <div className={styles.mainItemIcon}>
                    <Icon icon="fluent:search-16-regular" />
                </div>

                <span className={`${styles.mainItemLabel} ${!props.sideBarOpened ? styles.mainItemLabelHidden : {}}`}>{props.label}</span>
            </div>

            {props.items?.map(item => {
                return <NavigationItem {...item} sideBarOpened={props.sideBarOpened} inset={props.inset + 1} />
            })}
        </div>
    )
}
