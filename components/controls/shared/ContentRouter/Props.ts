export interface Props {
    routes: {
        name: string;
        builder: (requestProps: any) => JSX.Element;
    }[];
}
