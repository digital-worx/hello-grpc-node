const grpc = require('@grpc/grpc-js');
require('dotenv').config();
var protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(
  './hello.proto',
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });

var helloProto = grpc.loadPackageDefinition(packageDefinition).hello;

const server = new grpc.Server();

server.addService(helloProto.Hello.service, {
  GetStatus: async (call, callback) => {
    try {
      callback(null, {
        status: 'server running',
      });
    } catch (error) {
      console.log(error);
    }
  },
  HelloServer: async (call, callback) => {
    try {
      var name = 'John Doe'
      if (call.request.name) {
        name = call.request.name;
      }
      callback(null, {
        message: 'Hi ' + name + ', server welcomes you',
      });
    } catch (error) {
      console.log(error);
    }
  }
});

if (process.env.NODE_ENV === 'production') {
  const fs = require('fs');
  server.bindAsync(
    'localhost:50051',
    grpc.ServerCredentials.createSsl(fs.readFileSync('cert/ca.crt'),
      [{ cert_chain: fs.readFileSync('cert/server.crt'), private_key: fs.readFileSync('cert/server.key') }], true
    ),
    (err, port) => {
      if (err != null) {
        console.error(err);
        return;
      }
      if (!port)
        return;
      server.start();
      console.log('Server with SSL listening on ', port);
    }
  );
}
else {
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log("Server without SSL running on 50051")
  });
}