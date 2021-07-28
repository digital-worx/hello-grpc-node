/**
 * @fileoverview gRPC-Web generated client stub for hello
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.hello = require('./hello_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.hello.HelloClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.hello.HelloPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.hello.Status,
 *   !proto.hello.StatusReply>}
 */
const methodDescriptor_Hello_GetStatus = new grpc.web.MethodDescriptor(
  '/hello.Hello/GetStatus',
  grpc.web.MethodType.UNARY,
  proto.hello.Status,
  proto.hello.StatusReply,
  /**
   * @param {!proto.hello.Status} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.hello.StatusReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hello.Status,
 *   !proto.hello.StatusReply>}
 */
const methodInfo_Hello_GetStatus = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hello.StatusReply,
  /**
   * @param {!proto.hello.Status} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.hello.StatusReply.deserializeBinary
);


/**
 * @param {!proto.hello.Status} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hello.StatusReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hello.StatusReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hello.HelloClient.prototype.getStatus =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hello.Hello/GetStatus',
      request,
      metadata || {},
      methodDescriptor_Hello_GetStatus,
      callback);
};


/**
 * @param {!proto.hello.Status} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hello.StatusReply>}
 *     Promise that resolves to the response
 */
proto.hello.HelloPromiseClient.prototype.getStatus =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/hello.Hello/GetStatus',
      request,
      metadata || {},
      methodDescriptor_Hello_GetStatus);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.hello.HelloRequest,
 *   !proto.hello.HelloReply>}
 */
const methodDescriptor_Hello_HelloServer = new grpc.web.MethodDescriptor(
  '/hello.Hello/HelloServer',
  grpc.web.MethodType.UNARY,
  proto.hello.HelloRequest,
  proto.hello.HelloReply,
  /**
   * @param {!proto.hello.HelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.hello.HelloReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hello.HelloRequest,
 *   !proto.hello.HelloReply>}
 */
const methodInfo_Hello_HelloServer = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hello.HelloReply,
  /**
   * @param {!proto.hello.HelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.hello.HelloReply.deserializeBinary
);


/**
 * @param {!proto.hello.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hello.HelloReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hello.HelloReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hello.HelloClient.prototype.helloServer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hello.Hello/HelloServer',
      request,
      metadata || {},
      methodDescriptor_Hello_HelloServer,
      callback);
};


/**
 * @param {!proto.hello.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hello.HelloReply>}
 *     Promise that resolves to the response
 */
proto.hello.HelloPromiseClient.prototype.helloServer =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/hello.Hello/HelloServer',
      request,
      metadata || {},
      methodDescriptor_Hello_HelloServer);
};


module.exports = proto.hello;

