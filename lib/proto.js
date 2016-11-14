import protobufjs from 'protobufjs'
import fs from 'fs'
import path from 'path'

let list = [
    "Msg",
    "ClientConnect",
    "ClientDisconnect",
    "PtyRequest",
    "SftpReaddir",
    "SftpMkdir",
    "SftpResponse",
    "FileInfo",
    "OkResponse",
    "MsgResponse",
    "ErrorResponse",
    "PtyResponse"
];

export var messages = new Promise(() => {});

export const load = (msg) => new Promise((resolve, reject) => {
    protobufjs.load(msg, (err, root) => {
        if(err) {
            reject(err)
        } else {
            let parsed = new Map();
            list
                .map(name => ({ name, path: `messages.${name}` }))
                .forEach(({ name, path }) => {
                    parsed.set(name, root.lookup(path))
                });
            resolve(root);
            messages = Promise.resolve(parsed);
        }
    })
});