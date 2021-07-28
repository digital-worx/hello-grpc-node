# Hello GRPC Server

It is a simple GRPC server written in node.js.

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

- Start server

```bash
node server.js
```

- Start client

````
```bash
node client.js
````

If you want to access the RPCs of the GRPC server similar to REST api endpoints than you will have to install a proxy server. It will accept REST api request and forward them as GRPC request to the server. We have used [envoy](https://www.envoyproxy.io/) as a proxy. Follow their extensive [documentation](https://www.envoyproxy.io/docs) for installation.

Once you have installed the envoy, you can [envoy config](envoy-v3.yaml) file to start and configure the instance. The following command shows how it is run on ubuntu.

```
envoy -c envoy-v3.yaml
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

## License

The project source code files are made available under the Apache License, Version 2.0 (Apache-2.0), located in the [LICENSE](LICENSE) file.
