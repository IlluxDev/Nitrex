export interface Props {
    placeholder?: string;
    value?: string;
    type?: "text" | "password" | "search";
    dropdown?:
        | false
        | {
              label: string;
              description?: string;
              icon?: string;
              image?: string;
              action?: string | (() => void);
          }[];
    submit?: boolean;
    onSubmit?: (value: string) => void;
    onInput?: (value: string) => void;
}
