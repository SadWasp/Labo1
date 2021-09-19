const http = require('http');
const url = require('url')
const port = 5000;
const hostname = '127.0.0.1';
//const server = require('./route.js');
function AccessControlConfig(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
}
function Prefligth(req, res) {
    if (req.method === 'OPTIONS') {
        console.log('preflight CORS verifications');
        res.end();
        // request handled
        return true;
    }
    // request not handled
    return false;
}
const server = require('http').createServer((req, res) => {
    AccessControlConfig(res);
    if (!Prefligth(req, res)) {
        const reqUrl = url.parse(req.url, true);
        var calc = require('./controller.js');
        if(reqUrl.pathname == '/api/maths' && req.method == 'GET') {
            calc.mathApiOp(req, res);
        }
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
    }
});
server.listen(port, hostname, ()=> {
    console.log('Server en execution sur http://' + hostname + ':' + port +'/');
});