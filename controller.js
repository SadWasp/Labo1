const url = require('url')
const XYParams = ["+","-","*","/","%"," "]
const NParams = ["p","np","!"]

exports.mathApiOp = function(req, res) {
    const reqUrl = url.parse(req.url, true);
    const parsed = reqUrl.query
    response = Operations(parsed);
    res.statusCode = 200;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(response))
}

function Operations(params) {
    const wholeNum = require('./functions.js');
    value = undefined;
    err = hasErrors(params);

    if(err === undefined) {
        if(params.n !== undefined) {
            switch (params.op) { 
                case '!':
                    value = wholeNum.factorial(params.n);
                    break;
                case 'p':
                    value = wholeNum.isPrime(params.n);
                    break;
                case 'np':
                    value = wholeNum.primeNum(params.n);
                    break;
            }
        } else {
            switch (params.op) {
                case '+':
                case ' ':
                    value = parseFloat(params.x) + parseFloat(params.y);
                    break;
                case '-':
                    value = parseFloat(params.x) - parseFloat(params.y);
                    break;
                case '*':
                    value = parseFloat(params.x) * parseFloat(params.y);
                    break;
                case '/':
                    value = parseFloat(params.x) / parseFloat(params.y);
                    break;
                case '%':
                    value = parseFloat(params.x) % parseFloat(params.y);
                    break;
            }
        }
    }
    let response = params;
    if(value != undefined) response.value = value.toString();
    response.error = err;
    return response;
}

function hasErrors(params) {
    err = undefined;
    if(params.op === undefined) {
        err = "'op' parameter is missing";
    } else if (params.n !== undefined) {
        if (params.n !== undefined && Object.keys(params).length > 2) {
            err = "too many parameters";
        } else if (!NParams.includes(params.op)) {
            err = "unknown operation";
        }
    } else if (params.x !== undefined || params.X !== undefined && params.y !== undefined || params.Y !== undefined) {
        if (params.x !== undefined && Object.keys(params).length > 3) {
            err = "too many parameters";
        } else if (params.x == undefined && params.y !== undefined || params.X !== undefined) {
            err = "'x' parameter is missing";
        } else if (params.x != undefined && params.y === undefined || params.Y !== undefined) {
            err = "'y' parameter is missing";
        } else if(!isNumeric(params.x)) {
            err = "'x' parameter is not a number";
        } else if(!isNumeric(params.y)) {
            err = "'y' parameter is not a number";
        } else if(!XYParams.includes(params.op)) {
            err = "unknown operation";
        }   
    }
    return err
}

function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str))
}

