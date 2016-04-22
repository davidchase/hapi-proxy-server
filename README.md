# hapi-proxy

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]

[npm-image]: https://img.shields.io/npm/v/hapi-proxy.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/hapi-proxy
[travis-image]: https://img.shields.io/travis/davidchase/hapi-proxy.svg?style=flat-square
[travis-url]: https://travis-ci.org/davidchase/hapi-proxy

A simple h2o2 wrapper

## Install

```
npm install hapi-proxy
```

## Usage

```js
const hapiProxy = require('hapi-proxy');

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
        mapFn: function(request) {
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
        mapFn: function(request) {
            return request; 
        }
    }]
};

hapiProxy(config); // will create proxy hapi server at localhost:9001
```

## License

[MIT](LICENSE.md)
