import net, { createServer } from "net"
import { resolve as RequestResolver } from './response'
import { Clients } from './pty'

export var socket = new Promise(() => {});

export const connect = (addr) => new Promise((resolve, reject) => {
    const server = createServer(connection => {
        socket = Promise.resolve(connection);

        console.log("Connected");

        connection.on("data", data => {
            RequestResolver(data)
        })
    });

    server.listen(addr, () => {
        resolve(server);
    });
});