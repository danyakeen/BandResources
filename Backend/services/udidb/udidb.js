// user data identification db - UDIdb

let uids = {}

function on_request(request, response) {
    const { url, method } = request;
    let body = [];
    let response_body = {};

    if (method === 'POST') {

        if (url === '/fetchuid') {
            request
                .on('data', chunk => { body.push(chunk) })
                .on('end', chunk => {
                    try {
                        let request_body = JSON.parse(Buffer.concat(body).toString());
                        let id = request_body["user_id"];
                        let data = uids[id];
                        console.log(data);


                        if (!data) {
                            response.statusCode = 404;
                            let message = "invalid identifier";
                            response_body.message = message;
                        }
                        else {
                            response_body.data = data;
                        }

                    }

                    catch (error) {
                        response_body.error = "Content-Type:json required";
                    }
                    response.end(JSON.stringify(response_body));
                })
                return;
        }




        if (url === '/setuid') {

            request
                .on('data', chunk => { body.push(chunk) })
                .on('end', chunk => {
                    request_body = JSON.parse(Buffer.concat(body).toString());
                    Object.assign(uids, request_body);
                    response.end();
                })
            return;

        }


        else {
            request
                .on('data', () => { })
                .on('end', () => { })
            response_body.error = "Endpoint unavaliable";
            response.end(JSON.stringify(response_body));
            return;

        }

    }
    else {
        request
            .on('data', () => { })
            .on('end', () => { })
        response_body.error = "POST required";
        response.end(JSON.stringify(response_body));
        return;

    }
}

const http = require("node:http");
const server = http.createServer(on_request);

function listener() { };
server.on('request', listener)
server.listen(process.env.PORT)