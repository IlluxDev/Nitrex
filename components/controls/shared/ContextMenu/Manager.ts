export class Manager {
    private events = {
        move: [] as any[],
        close: [] as any[],
        render: [] as any[]
    }

    public moveTo(x: number, y: number) {

    }

    public on(event: "move", listener: () => void): void;

    public on(event: any, listener: any) {
        this.events[event].push(listener);
    }
}