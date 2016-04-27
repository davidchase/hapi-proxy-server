const test = require('tape');
const hapiProxyServer = require('../index');

hapiProxyServer({
  port: 0,
  host: 'localhost'
})
