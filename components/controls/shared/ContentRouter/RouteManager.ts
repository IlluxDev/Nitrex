class RouteManager {
    private currentRouteName = "main";
    private events = {
        routeChange: [] as any[]
    }

    public navigateRoute(name: string) {
        this.currentRouteName = name;
        this.events.routeChange.forEach(event => event(this.currentRouteName));
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