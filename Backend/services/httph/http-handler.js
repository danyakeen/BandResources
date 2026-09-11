const amqp = require('amqplib');

const PORT = process.env.PORT
const RABBITMQ_HOST = process.env.BROKER_HOST
const UDIDB_HOST = process.env.UDIDB_HOST


async function main() {
    const connection = await amqp.connect(`amqp://${RABBITMQ_HOST}`);
    const channel = await connection.createChannel();

    const queue = 'hello';
    const msg = 'Hello World!';

    await channel.assertQueue(queue, {
        durable: true,
        arguments: { 'x-queue-type': 'quorum' }
    });
    channel.sendToQueue(queue, Buffer.from(msg));

    console.log(" [x] Sent %s", msg);

    setTimeout(function () {
        connection.close();
        process.exit(0);
    }, 500);
}


function request_handler(request, response) {


    const { headers, url, method } = request;
    let body = [];
    success = true;

    switch ( method === 'POST') {
        case url === '/api/v1/easyocr':
            request
                .on('data', chunk => { body.push(chunk); console.log(`chunk ${chunk}\n\n`) })
                .on('end', () => {
                    body = Buffer.concat(body).toString();
                })
    }

    if (url === '/get') {
        body.push("get req accepted");

    }


    const responseBody = { success };

    response.write(JSON.stringify(responseBody));
    response.end("\n");


}


function listener(request, response) { }

const http = require("node:http");
const server = http.createServer(request_handler);

server.on('request', listener)
server.listen(PORT)