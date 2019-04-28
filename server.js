const PORT = 33333;
const HOST = '127.0.0.1';

const Protobuf = require('protobufjs');
const dgram = require('dgram');
const server = dgram.createSocket('udp4');


var builder = Protobuf.loadProtoFile('./cover.helloworld.proto'),
	  Cover = builder.build('cover'),
	  HelloCoverReq = Cover.helloworld.helloCoverReq;
    HelloCoverRsp = Cover.helloworld.helloCoverRsp;



server.on('listening', function() {
	var address = server.address();

	console.log(`UDP Server listening on ${address.address} : ${address.port}`)
})

server.on('message', function(message, remote) {
	console.log(`${remote.address} : ${remote.port} + ${message}`);
	console.log(`${HelloCoverReq.decode(message)} from client!`)

	// 服务器回复内容
	var hCRsp = new HelloCoverRsp({
		retcode: 0,
		reply: 'Yeah!I\'m handsome cover!'
	})

	var buffer = hCRsp.encode();
	var message = buffer.toBuffer();
	server.send(message, 0, message.length, remote.port, remote.address, function(err, bytes) {
		if (err) {
			throw err;
		}

		console.log(`UDP message reply to ${remote.address} : ${remote.port}`)
	})
})

server.bind(PORT, HOST)