# Hello gRPC Server

It is a simple gRPC server written in node.js.

## Prerequisite

### Node

Install Node js version 12.18.1. We installed it using [nvm](https://github.com/nvm-sh/nvm)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
nvm install 12.18.1
```

## Usage

- clone the repository and install packages

```bash
git clone git@github.com:digital-worx/hello-grpc-node.git
cd hello-grpc-node
npm install
```

- generate ssl certificate if you want to secure grpc server

```
./gen-cert.sh
```

It will generate CA, server and client certficates.

- Start server

```bash
npm start
```

- Start client

```bash
npm run client
```

You can also test it using [Hello gRPC web client](https://github.com/digital-worx/hello-grpc-react).

If you want to access the RPCs of the gRPC server similar to REST api endpoints than you will have to install a proxy server. It will accept REST api request and forward them as gRPC request to the server. We have used [envoy](https://www.envoyproxy.io/) as a proxy. Follow their extensive [documentation](https://www.envoyproxy.io/docs) for installation.

Once you have installed the envoy, you can use [envoy config](envoy-v3.yaml) file to start and configure the instance. The following command shows how it is run on ubuntu.

```
envoy -c envoy-v3.yaml
```
If the GRPC server listen over TLS then you need to enable upstream TLS on enovy. Use following command.

```
envoy -c envoy-v3-upstream-tls.yaml
```

The envoy proxy is configured to listen on `0.0.0.0:8080` in the [envoy-v3.yaml](envoy-v3.yaml) file. You can make a HTTP request using cURL as shown bellow.

```bash
curl -H 'content-type: application/json' http://localhost:8080/hello.Hello/getStatus
```

response

```json
{
  "status": "server running"
}
```

```bash
curl -X POST  -H 'content-type: application/json' http://localhost:8080/hello.Hello/helloServer -d '{"name": "rohit"}'
```

response

```json
{
  "message": "Hi rohit, server welcomes you"
}
```

On the envoy proxy instance [gRPC-JSON transcoder](https://www.envoyproxy.io/docs/envoy/v1.18.3/configuration/http/http_filters/grpc_json_transcoder_filter) was used for transcoding. It requires server proto in `.pb` format as shown in the code snippet from `envoy-v3.yaml` below.

```yaml
- name: envoy.filters.http.grpc_json_transcoder
  typed_config:
    "@type": type.googleapis.com/envoy.extensions.filters.http.grpc_json_transcoder.v3.GrpcJsonTranscoder
    proto_descriptor: "hello.pb"
    services: ["hello.Hello"]
```

If you make changes in [hello.proto](hello.proto) than `hello.pb` must be regenerated. It is done using [protocol compiler](https://github.com/protocolbuffers/protobuf#protocol-compiler-installation). Follow the following documentation.

```
sudo apt update
sudo apt install protobuf-compiler
git clone https://github.com/googleapis/googleapis
export GOOGLEAPIS_DIR=<your-local-googleapis-folder>
cd hello-grpc-node
protoc -I. -I$GOOGLEAPIS_DIR --include_imports --include_source_info --descriptor_set_out=hello.pb ./hello.proto
```

## License

The project source code files are made available under the Apache License, Version 2.0 (Apache-2.0), located in the [LICENSE](LICENSE) file.
