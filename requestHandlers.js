var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');

function start(response, postData) {
    console.log("Request handler 'start' was called.");
    
    var body = '<html>' + 
    '<head>' + 
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>' +
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="upload" multiple="multiple"/>'+
    '<br/>' + 
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
  }
  
  function upload(res, req) {
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      console.log('parsing done, files.upload.path ', files.upload.path);
      fs.renameSync(files.upload.path, './tmp/test.png');
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('received image : <br/>');
      res.write('<img src="/show"/>');
    });
  }

  function show(res) {
    console.log('request handler "show" was called');
    fs.readFile('./tmp/test.png', 'binary', function(err, file) {
      if(err) {
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.write(err + '\n');
        res.end();
      } else {
        res.writeHead(200, {"Content-Type": "image/png"});
        res.write(file, 'binary');
        res.end();
      }
    });
  }
  
  exports.start = start;
  exports.upload = upload;
  exports.show = show;