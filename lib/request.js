import { generate } from 'randomstring'

import { socket } from './socket'
import { messages } from './proto'

export let Requests = new Map();


export const sftp = {
    mkdir: (path, name, client) => new Promise((resolve, reject) => {
        messages.then(msg => {
            const SftpMkdir = msg.get("SftpMkdir");
            const _id = generate(32);

            let request = SftpMkdir.encode({ Id: _id, Path: path, Name: name, Scope: "SftpScope", Type: "SftpMkdir", Client: client }).finish()
            socket.then(sock => {
                Requests.set(_id, (data) => {
                    console.log(">>", data)
                    resolve(data)
                });
                sock.write(request);
            });
        });
    }),
    ls: (path, client) => new Promise((resolve, reject) => {
        messages.then(msg => {
            const SftpReaddir = msg.get("SftpReaddir");
            const _id = generate(32);

            let request = SftpReaddir.encode({ Id: _id, Path: path, Scope: "SftpScope", Type: "SftpReaddir", Client: client }).finish()
            socket.then(sock => {
                Requests.set(_id, (data) => {
                    resolve(data)
                });
                sock.write(request);
            });
        });
    }),
    touch: () => {

    },
};

export const pty = {
    cmd: (client, cmd) => new Promise((resolve, reject) => {
        messages.then(msg => {
            const PtyRequest = msg.get("PtyRequest");
            const _id = generate(32);
            
            let request = PtyRequest.encode({
                Id: _id,
                Scope: "PtyScope",
                Type: "PtyRequest",
                Client: client,
                Payload: cmd
            }).finish();

            socket.then(sock => {
                sock.write(request);
                resolve(true)
            });
        });
    })
};

export const client = {
    connect: (client) => new Promise((resolve, reject) => {
        messages.then(msg => {
            const ClientConnect = msg.get("ClientConnect");
            const _id = generate(32);
            
            let request = ClientConnect.encode({ Id: _id, Scope: "ClientScope", Type: "ClientConnect", Client: client }).finish();

            socket.then(sock => {
                Requests.set(_id, (data) => {
                    resolve(data)
                });
                sock.write(request);
            });
        });
    }),
    disconnect: () => {

    },
};