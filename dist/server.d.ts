export declare class Server {
    private app;
    private port;
    private Model;
    constructor();
    routes(): void;
    cors(): void;
    connectDB: () => Promise<void>;
    listen(): void;
}
