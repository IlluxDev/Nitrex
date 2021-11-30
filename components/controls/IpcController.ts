let ipcRenderer: any | null = null;

if ((window as any).require) {
    ipcRenderer = (window as any).require("electron").ipcRenderer;
}

class IpcController {
    public send<MessageType>(channel: string, message: MessageType) {
        ipcRenderer?.send(channel, message);
    }

    public onCommand<MessageType>(
        channel: string,
        listener: (message: MessageType) => void
    ) {
        ipcRenderer?.on(channel, (event, message) => {
            listener(message);
        });
    }
}

const ipcController = new IpcController();
export { ipcController };
