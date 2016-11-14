export let Clients = new Map();
export let Logs = new Map();

export function resolve(message) {
    let { Client } = message;

    if(Clients.has(Client)) {
        let data = { Client, payload: message.Payload };
        let WS = Clients.get(Client);

        let logs = Logs.has(Client) ? Logs.get(Client) : [];
        logs.push(message.Payload.toString());
        Logs.set(Client.toString(), logs);

        WS.emit("pty.data", { client: Client, payload: message.Payload.toString() });
    }
}