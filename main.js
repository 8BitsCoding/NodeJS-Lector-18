var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;

    /*
    // 여기를 새로 만들어 보자.
    if(_url == '/'){
        title = 'Welcome';
    }
    if(_url == '/favicon.ico'){
        return response.writeHead(404);
    }
    */

    console.log(url.parse(_url, true).pathname);
    // pathname은 querystring을 제외한 주소를 말한다.

    var pathName = url.parse(_url, true).pathname;

    if(pathName === '/') {
        // pathName이 root로 들어오면 정상처리
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
            var template = `
        <!doctype html>
        <html>
        <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">WEB</a></h1>
            <ul>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ul>
            <h2>${title}</h2>
            <p>${description}</p>
        </body>
        </html>
        `;
            response.writeHead(200);
            response.end(template);
        })
    } else {
        // 그렇지 않으면 에러처리
        response.writeHead(404);
        response.end('Not found');
    }

});
app.listen(3000);