import * as io from "socket.io-client";
import { autobind } from "core-decorators";

@autobind
export class Socket {
    static readonly URL = "http://localhost:8080";

    private socket: SocketIOClient.Socket;

    connect(): void {
        this.socket = io(Socket.URL);
    }

    disconnect(): void {
        this.socket.disconnect();
    }

    on(event: string, callback: (data: any) => void): void {
        this.socket.on(event, callback);
    }

    once(event: string, callback: (data: any) => void): void {
        this.socket.once(event, callback);
    }

    emit(event: string, ...args: any[]) {
        this.socket.emit(event, args);
    }

    getSocket(): SocketIOClient.Socket {
        return this.socket;
    }
}
