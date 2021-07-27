const grpc = require('@grpc/grpc-js');

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

server.bindAsync(
  '0.0.0.0:50051',
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err != null) {
      console.error(err);
      return;
    }
    console.log('Server listening on ', port);
    server.start();
  }
);