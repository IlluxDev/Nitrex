import { Icon } from "@iconify/react";
import React, {
    CSSProperties,
    forwardRef,
    useEffect,
    useRef,
    useState,
} from "react";
import styles from "./NavigationItem.module.scss";
import { NavigationItemProps } from "../../shared/NavigationView/NavigationItemProps";
import { useNavigate } from "react-router-dom";
import { renderer } from "../../Renderer";

export function NavigationItem(props: NavigationItemProps) {
    const [opened, setOpenedState] = useState(false);
    const navigate = useNavigate();

    const mainItemStyles: CSSProperties = {};
    if (props.inset) {
        mainItemStyles.paddingLeft = props.sideBarOpened
            ? props.inset
                ? props.inset * 20
                : 1
            : 0;
    }

    return (
        <div className={`${styles.root} ${props.divider ? styles.dividerMode : {}} ${!props.label ? styles.dividerNoLabel : {}} ${props.hideDivider ? styles.hideDividerLine : {}}`}>
            {props.divider ? <span className={styles.dividerLabel}>{props.label}</span> : null}
            {props.divider && !props.hideDivider ? <hr className={styles.divider} /> : null}

            { !props.divider ? <>
                <div
                    onClick={() => {
                        opened ? setOpenedState(false) : setOpenedState(true);

                        if (props.action) {
                            if (typeof props.action == "function") {
                                props.action();
                                return;
                            }

                            if (props.action.startsWith("http") || props.action.startsWith("https")) {
                                renderer.openExternal(props.action);
                            } else {
                                navigate(props.action);
                            }
                        }
                    }}
                    className={`${styles.mainItem} ${!props.sideBarOpened ? styles.mainItemCompact : {}}`}
                    style={mainItemStyles}
                >
                    <div className={styles.mainItemIcon}>
                        {props.icon && !props.image ? (
                            <Icon icon={props.icon} />
                        ) : props.image && !props.icon ? (
                            <img src={props.image} />
                        ) : (
                            <Icon icon="fluent:paint-brush-16-regular" />
                        )}
                    </div>

                    <span
                        className={`${styles.mainItemLabel} ${!props.sideBarOpened ? styles.mainItemLabelHidden : {}}`}
                    >
                    {props.label}
                </span>
                </div>
                <div
                    className={`${styles.itemsDropDown} ${props.sideBarOpened && opened
                        ? {}
                        : styles.itemsDropDownHide}`}
                >
                    {props.items?.map((item) => {
                        return (
                            <NavigationItem
                                key={"NavigationView_NavigationItem_item_" +
                                item.label +
                                new Date()}
                                {...item}
                                sideBarOpened={props.sideBarOpened}
                                inset={props.inset + 1} />
                        );
                    })}
                </div>
            </> : null }
        </div>
    );
}
