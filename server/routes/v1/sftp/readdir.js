import { sftp } from '../../../../lib/request'

export default function(req, res) {
    sftp
        .ls(req.query.path, req.query.client)
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
}