let webFrame: any | null = null;
let shell: any | null = null;

if ((window as any).require) {
    shell = (window as any).require("electron").shell;
    webFrame = (window as any).require("electron").webFrame;
}

class Renderer {
    private mouseLocation = {
        left: 0,
        top: 0
    };

    public constructor() {
        window.addEventListener("mousemove", e => {
            this.mouseLocation = {
                left: e.clientX,
                top: e.clientY
            };
        });
    }

    /**
     * Set the application zoom
     * @supported Desktop
     * @param zoom The zoom scale for the page
     */
    public setPageZoom(zoom: number) {
        webFrame?.setZoomFactor(zoom);
    }

    /**
     * Open a URL in a new browser tab
     * @param url The URL of the web page
     */
    public openExternal(url: string) {
        if (shell) {
            shell.openExternal(url);
            return;
        }

        window.open(url, "_blank");
    }

    public getMousePosition(): { left: number, top: number } {
        return this.mouseLocation;
    }
}

const renderer = new Renderer();
export { renderer };
