export interface NavigationItemProps {
    label: string;
    items?: NavigationItemProps[];
    action?: (() => void) | string;
    inset?: number;
    sideBarOpened?: boolean;
}