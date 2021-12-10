import { Manager } from "./Manager";

export interface Props {
    show?: boolean;
    onManagerReady?: (manager: Manager) => void;
    content?: {
        label: string;
        divider?: boolean;
        items?: Props["content"];
        icon?: string;
        image?: string;
    }[];
}