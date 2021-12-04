export interface Props {
    children?: string;
    onToggle?: (value: boolean) => void;
    disabled?: boolean;
    default?: boolean;
}
