class WindowEffects {
    private effect: "mica" | "acrylic" | false = false;
    private events = {
        modeChange: [] as any[]
    }

    public applyEffect(effect: "mica" | "acrylic" | false) {
        this.effect = effect;
        this.events.modeChange.forEach(event => event());
    }

    public getEffect(): "mica" | "acrylic" | false {
        return this.effect;
    }

    public on(event: "modeChange", listener: () => void): void;

    public on(event: any, listener: any) {
        (this.events as any)[event].push(listener);
    }
}

const windowEffects = new WindowEffects();
export { windowEffects };