// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

http.createServer(function (req, res) {
    console.log(req.url);
    if (req.url == '/form') {
        fs.readFile('form.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
    if (req.url == '/submit') {
        var data = '';
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
            var dataObject = qs.parse(data);
            console.log(dataObject);
            fs.appendFile('comments.txt', JSON.stringify(dataObject) + '\n', function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
        });
    }
}).listen(8080);