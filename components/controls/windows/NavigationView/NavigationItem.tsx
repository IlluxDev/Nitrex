import { Icon } from "@iconify/react";
import { NavigationItemProps } from "./NavigationItemProps";
import React, { CSSProperties, forwardRef, useEffect, useRef, useState } from "react";
import styles from "./NavigationItem.module.scss";

function NavigationItem(props: NavigationItemProps) {
    const [opened, setOpenedState] = useState(false);

    const mainItemStyles: CSSProperties = {};
    if (props.inset) {
        mainItemStyles.paddingLeft = props.sideBarOpened ? (props.inset ? props.inset * 20 : 1) : 0;
    }

    return (
        <div className={styles.root}>
            <div onClick={() => {
                opened ? setOpenedState(false) : setOpenedState(true);

                if (props.action) {
                    if (typeof props.action == "function") {
                        props.action();
                    }
                }
            }} className={`${styles.mainItem} ${!props.sideBarOpened ? styles.mainItemCompact : {}}`} style={mainItemStyles}>
                <div className={styles.mainItemIcon}>
                    {
                        props.icon && !props.image
                            ? <Icon icon={props.icon} />
                            : (
                                props.image && !props.icon
                                    ? <img src={props.image} />
                                    : <Icon icon="fluent:paint-brush-16-regular" />
                            )
                    }
                </div>

                <span className={`${styles.mainItemLabel} ${!props.sideBarOpened ? styles.mainItemLabelHidden : {}}`}>{props.label}</span>
            </div>

            <div className={`${styles.itemsDropDown} ${props.sideBarOpened && opened ? {} : styles.itemsDropDownHide}`}>
                {props.items?.map(item => {
                    return <NavigationItem key={"NavigationView_NavigationItem_item_" + item.label + new Date()} {...item} sideBarOpened={props.sideBarOpened} inset={props.inset + 1} />
                })}
            </div>
        </div>
    )
}

const _NavigationItem = React.forwardRef(NavigationItem);
export { _NavigationItem as NavigationItem };
