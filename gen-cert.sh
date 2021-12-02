#!/bin/bash

PASSWD=1231
set OPENSSL_CONF=/usr/lib/ssl/openssl.cfg

mkdir cert
cd cert

echo Remove old crts and keys
rm *.crt *.key

echo Generate CA key:
openssl genrsa -passout pass:$PASSWD -des3 -out ca.key 4096

echo Generate CA cert:
openssl req -passin pass:$PASSWD -new -x509 -days 365 -key ca.key -out ca.crt -subj  "/C=DE/ST=BW/L=Stuttgart/O=DW/OU=SecureGRPC/CN=MyRootCA"

echo Generate server key:
openssl genrsa -passout pass:$PASSWD -des3 -out server.key 4096

echo Generate server csr:
openssl req -passin pass:$PASSWD -new -key server.key -out server.csr -subj  "/C=DE/ST=DW/L=Stuttgart/O=DW/OU=SecureGRPC/CN=localhost"

echo Self-sign server cert:
openssl x509 -req -passin pass:$PASSWD -days 365 -in server.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out server.crt

echo Remove password from server key:
openssl rsa -passin pass:$PASSWD -in server.key -out server.key

echo Generate client key
openssl genrsa -passout pass:$PASSWD -des3 -out client.key 4096

echo Generate client csr:
openssl req -passin pass:$PASSWD -new -key client.key -out client.csr -subj  "/C=DE/ST=BW/L=Stuttgart/O=DW/OU=SecureGRPC/CN=localhost"

echo Self-sign client cert:
openssl x509 -passin pass:$PASSWD -req -days 365 -in client.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out client.crt

echo Remove password from client key:
openssl rsa -passin pass:$PASSWD -in client.key -out client.key

echo Remove csr
rm *.csr
