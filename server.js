var http = require('http');
var url = require('url');

function start(route, handle) {
    var onRequest = function(req, res) {
        var postData = '';
        var pathname = url.parse(req.url).pathname;
        console.log('request for ' + pathname + 'has received');
        route(handle, pathname, res, req);
    }
    
    http.createServer(onRequest).listen(8000);
    console.log('server has started');
}

exports.start = start;
