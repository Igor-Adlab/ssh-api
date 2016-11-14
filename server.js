import path from 'path'
import { load, messages } from './lib/proto'
import { connect, socket } from './lib/socket'
import web from './web'

Promise.all([
    load(path.resolve(__dirname, "messages.proto")),
    connect("/tmp/main-client.sock")
])
.then(([ root, server ]) => {
    console.log("Loaded!");
    web.listen(3000, () => {
        console.log("Web UI started.")
    });
})
.catch(error => {
    console.log(error)
});