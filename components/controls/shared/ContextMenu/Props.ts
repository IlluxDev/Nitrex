import { Manager } from "./Manager";

export interface Props {
    show?: boolean;
    onManagerReady?: (manager: Manager) => void;
}