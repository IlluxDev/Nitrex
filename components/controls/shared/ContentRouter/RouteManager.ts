class RouteManager {
    private currentRouteName = "main";
    private history = ["main"];
    private historyLocation = 0;
    private events = {
        routeChange: [] as any[]
    }

    public back() {
        if (this.history.length != 1) {
            this.history.pop();
            this.historyLocation--;
        }

        this.currentRouteName = this.history[this.historyLocation];
        this.events.routeChange.forEach(event => event(this.currentRouteName));
    }

    public navigateRoute(name: string) {
        this.history.push(name);
        this.historyLocation++;
        this.currentRouteName = name;
        this.events.routeChange.forEach(event => event(this.currentRouteName));
    }

    public getHistory(): string[] {
        return this.history;
    }

    public getHistoryPosition(): number {
        return this.historyLocation;
    }

    public getCurrentRouteName(): string {
        return this.currentRouteName;
    }

    public on(event: "routeChange", listener: (routeName: string) => void): void;

    public on(event: any, listener: any) {
        this.events.routeChange.push(listener);
    }
}

const routeManager = new RouteManager();
export { routeManager };