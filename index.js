var server = require('./server');
var router = require('./router');
var requestHanlers = require('./requestHandlers');

var handle = {};
handle['/'] = requestHanlers.start;
handle['/start'] = requestHanlers.start;
handle['/upload'] = requestHanlers.upload;

server.start(router.route, handle);