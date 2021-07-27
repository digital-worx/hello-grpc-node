
let grpc = require('@grpc/grpc-js');
let protoLoader = require('@grpc/proto-loader');
let packageDefinition = protoLoader.loadSync(
  './hello.proto',
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
let helloProto = grpc.loadPackageDefinition(packageDefinition).hello;

let client = new helloProto.Hello('localhost:50051', grpc.credentials.createInsecure());


client.GetStatus({}, function (err, response) {
  console.log('GetStatus: ', response);
});

client.HelloServer({ name: 'GRPC Client' }, function (err, response) {
  console.log('HelloServer', response);
});