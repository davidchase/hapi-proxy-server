# hapi-proxy-server

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]

[npm-image]: https://img.shields.io/npm/v/hapi-proxy-server.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/hapi-proxy-server
[travis-image]: https://img.shields.io/travis/davidchase/hapi-proxy-server.svg?style=flat-square
[travis-url]: https://travis-ci.org/davidchase/hapi-proxy-server

A simple h2o2 wrapper

## Install

```
npm install hapi-proxy-server
```

## Usage

```js
const hapiProxyServer = require('hapi-proxy-server');

const config = {
    port: 9001,
    host: 'localhost',
    proxy: [{
        method: 'GET',
        path: '/path/{p*}',
        passThrough: true,
        headers: [
            ['Content-Encoding', 'gzip'],
            ['Content-Type', 'text/html charset=utf-8'] // 2d Arrays allow for dynamic key values
        ],
        mapRequest: function(request) {
            return request; // return proxy path
        }
    },{
        method: '*',
        path: '/path/{p*}',
        passThrough: true,
        headers: [
            ['Content-Encoding', 'gzip'],
            ['Content-Type', 'text/html charset=utf-8']
        ],
        mapRequest: function(request) {
            return request; 
        }
    }]
};

hapiProxyServer(config); // will create proxy hapi server at localhost:9001
```

### Min config

```js
const config = {
    proxy: [{
        method: 'GET',
        path: '/path/{p*}',
        mapRequest: function(request) {
            return request; // return proxy path
        }
    }]
}

hapiProxyServer(config); // will create proxy hapi server at localhost and a random available port
```

## API

`passThrough` a boolean to allow headers from the client to pass onto the proxied endpoint (default true).

`headers` as a list `[[key, values]]` pairs to pass on to the proxy.

`mapRequest` a `function (request)` that takes a request and needs to return the absolute uri.

`port` a port to listen on for the server (default 0, random).

`host` proxy host name (default localhost).

`path` path of the proxy route.

`method` method name to use on the proxy route.

## Todo

- [ ] Add more options
- [ ] Publish to npm
- [ ] Add tests

## License

[MIT](LICENSE.md)
