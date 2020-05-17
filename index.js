'use strict';

// default port, modules setup
const 
    port = 3009, 
    http = require('http'),
    url = require('url'),
    pagehit = new (require('./lib/pagehit'))(),
    httpResponse = require('./lib/httpresponse');


// new server
http.createServer((req, res) => {
    let count = pagehit.count(req);

    if (!count) {
        httpResponse({ res, status: 400, content: 'No referer' });
        return;
    }

    let uri = url.parse(req.url).pathname;
    switch (uri) {
        case '/counter.js':

        httpResponse({
            res,
            mime: 'application/javascript',
            content: `document.write('<span class="pagecounter">${count}</span>');`
        });
        break;

        default:
            httpResponse({ res, status: 404, content: 'Not found' });
            break;
    }
    
}).listen(port);

console.log(`page hit web service running on port ${port}`);