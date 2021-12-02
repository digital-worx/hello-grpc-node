
let grpc = require('@grpc/grpc-js');
let protoLoader = require('@grpc/proto-loader');
require('dotenv').config();
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

var client = null;
if (process.env.NODE_ENV === 'production') {
  const fs = require('fs');
  const credentials = grpc.credentials.createSsl(
    fs.readFileSync('./cert/ca.crt'),
    fs.readFileSync('./cert/client.key'),
    fs.readFileSync('./cert/client.crt'),
    true
  );
  client = new helloProto.Hello('localhost:50051', credentials);
}
else {
  client = new helloProto.Hello('localhost:50051', grpc.credentials.createInsecure());
}

client.GetStatus({}, function (err, response) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('GetStatus: ', response);
});

client.HelloServer({ name: 'GRPC Client' }, function (err, response) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('HelloServer', response);
});