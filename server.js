var http = require('http');
var url = require('url');

function start(route, handle) {
    var onRequest = function(req, res) {
        var pathname = url.parse(req.url).pathname;
        route(handle, pathname);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(pathname);
        res.end();
    }
    
    http.createServer(onRequest).listen(8000);
    console.log('server has started');
}

exports.start = start;
