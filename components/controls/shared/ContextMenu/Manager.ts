export class Manager {
    private events = {
        move: [] as any[],
        close: [] as any[],
        render: [] as any[],
        open: [] as any[]
    };

    public moveTo(x: number, y: number) {
        this.events.move.forEach(event => event({
            left: x,
            top: y
        }));
    }

    public show() {
        this.events.open.forEach(event => event());
    }

    public hide() {
        this.events.close.forEach(event => event());
    }

    public on(event: "move", listener: (position: { left: number, top: number }) => void): void;
    public on(event: "open", listener: () => void): void;
    public on(event: "close", listener: () => void): void;
    public on(event: "render", listener: () => void): void;

    public on(event: any, listener: any) {
        this.events[event].push(listener);
    }
}