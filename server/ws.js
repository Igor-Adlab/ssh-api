import { Clients, Logs } from '../lib/pty'
import { pty } from '../lib/request'

export default function(IO) {
    IO.on("connect", (ws) => {
        console.log("[WS][Connect]: New connection started");
        
        ws.on("pty.run", ({ client }) => {
            ws.join(client);
            Clients.set(client, ws);

            ws.emit("pty.data", { client, payload: Logs.has(client) ? Logs.get(client) : [] });
        });

        ws.on("pty.message", ({ client, cmd }) => {
            pty.cmd(client, cmd)
        });
    })
}