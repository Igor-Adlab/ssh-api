import { socket } from './socket'
import { messages } from './proto'
import { resolve as PtySendMessage } from './pty'

import { Requests } from './request'

export const resolve = (data) => {
    messages.then(msg => {
        console.log("[PtyResponse]: ", msg.has("PtyResponse"), msg.get("PtyResponse"));
        var PtyResponse = msg.get("PtyResponse");
        var MsgResponse = msg.get("MsgResponse");

        var OkResponse = msg.get("OkResponse");
        var ErrorResponse = msg.get("ErrorResponse");

        var response = MsgResponse.decode(data);
        var requestResolver = Requests.get(response.Request);

        if(response.Scope == "PtyScope") {
            console.log(response.Type, response.Scope)
            try {
                response = PtyResponse.decode(data);
                PtySendMessage(response);
            } catch(e) {
                console.log("[ERROR]: ", e)
            }
        } else {
            if(response.Ok) {
                response = OkResponse.decode(data);
                requestResolver(response);
            } else {
                response = ErrorResponse.decode(data);
                requestResolver(response);
            }
        }
    })
};