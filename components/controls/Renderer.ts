let webFrame: any | null = null;
if ((window as any).require) {
    webFrame = (window as any).require("electron").webFrame;
}

class Renderer {
    public setPageZoom(zoom: number) {
        webFrame?.setZoomFactor(zoom);
    }
}

const renderer = new Renderer();
export { renderer };
