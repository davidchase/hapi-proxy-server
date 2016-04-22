'use strict';
const Hapi = require('hapi');
const h2o2 = require('h2o2');

const head = xs => xs[0];

const last = xs => xs[xs.length - 1];

const fromPairs = function(xs) {
    return xs.reduce(function(obj, x) {
        if (x.length) {
            obj[head(x)] = last(x);
        }
        return obj;
    }, {});
};

module.exports = function(config) {
    const server = new Hapi.Server();

    server.connection({
        host: config.host || 'localhost',
        port: config.port || 0
    });

    server.register({
            register: h2o2
        },
        function startProxy(err) {
            if (err) {
                throw err;
            }
            server.start(() => console.log('server started at:', server.info.uri));
        });

    const routeOpts = config.proxy.map(function(proxy) {
        return {
            method: proxy.method,
            path: proxy.path,
            handler: {
                proxy: {
                    passThrough: proxy.passThrough,
                    mapUri: function(request, callback) {
                        const proxiedURI = proxy.mapFn(request);
                        callback(null, proxiedURI, fromPairs(proxy.headers));
                    }
                }
            }
        };
    });
    server.route(routeOpts);
};
