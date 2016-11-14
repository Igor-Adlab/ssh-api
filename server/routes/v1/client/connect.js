import { client } from '../../../../lib/request'

export default function(req, res) {
    client.connect(req.params.id)
        .then(data => {
            res.json({
                Type: data.Type,
                Client: data.Client,
                Scope: data.Scope,
                Request: data.Request,
                Ok: data.Ok
            })
        })
        .catch(error => console.log(error) || res.status(500).json({ ok: false }))
}