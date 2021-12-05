let webFrame: any | null = null;
let shell: any | null = null;

if ((window as any).require) {
    shell = (window as any).require("electron").shell;
    webFrame = (window as any).require("electron").webFrame;
}

class Renderer {
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
}

const renderer = new Renderer();
export { renderer };
