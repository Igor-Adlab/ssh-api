import { createServer } from 'http'
import Express from 'express'
import SocketIO from 'socket.io'
import { sftp, client } from './lib/request'
import { api } from './server/routes'
import ws from './server/ws'

let app = Express();
let http = createServer(app);
let IO = SocketIO.listen(http);

app.use(Express.static('public'));
app.use('/api', api);

ws(IO);

app.get("/sftp/mkdir", (req, res) => {
    sftp
        .mkdir(req.query.path, req.query.name, req.query.client)
        .then(data => {
            res.json({
                Type: data.Type,
                Client: data.Client,
                Scope: data.Scope,
                Request: data.Request,
                Ok: data.Ok
            })
        })
        .catch(data => {
            res.json({
                Type: data.Type,
                Client: data.Client,
                Scope: data.Scope,
                Request: data.Request,
                Ok: data.Ok
            })
        })
});

export default http