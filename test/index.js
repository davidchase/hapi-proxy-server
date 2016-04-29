const http = require('http');
const test = require('tape');
const nock = require('nock');
const hapiProxyServer = require('../index');

const server = hapiProxyServer({
    port: 9001,
    host: 'localhost',
    proxy: [{
        method: 'GET',
        path: '/dummy',
        mapRequest: function(request) {
            return 'http://localhost:9000/api/dummy';
        }
    }]
});

test('should have port of 9001', function(t){
   t.plan(1);
   t.ok(server.info.port, 9001);
});

test('should have host of localhost', function(t){
   t.plan(1);
   t.ok(server.info.port, 'localhost');
});

