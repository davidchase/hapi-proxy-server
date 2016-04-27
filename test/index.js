const test = require('tape');
const nock = require('nock');
const hapiProxyServer = require('../index');


hapiProxyServer({
  port: 9001,
  host: 'localhost'
});
