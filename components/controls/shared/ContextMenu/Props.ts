import { Manager } from "./Manager";

export interface Props {
    show?: boolean;
    onManagerReady?: (manager: Manager) => void;
<<<<<<< HEAD
    content?: {
        label: string;
        divider?: boolean;
        items?: Props["content"];
        icon?: string;
        image?: string;
    }[];
=======
>>>>>>> 8ed80778287a06451da412078c760e2f694ae7b6
}