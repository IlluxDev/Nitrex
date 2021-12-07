export interface Props {
    routes: [{
        name: "main";
        builder: (requestProps: any) => JSX.Element;
    }, ...{
        name: string;
        builder: (requestProps: any) => JSX.Element;
    }[]];
}
