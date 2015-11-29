var http = require('http');
var url = require('url');
var fs = require('fs');
var settings = require('./settings');
var data;
var server = http.createServer(listener);

server.listen(settings.port);
console.log('Server start');

function listener(req, response) {

    var urlInfo = url.parse(req.url, true);
    var name = urlInfo.query.name;
    var func = urlInfo.query.function;
    var value = urlInfo.query.value;

    if(req.url == '/settings'){
    	fs.readFile(__dirname + '/settings.html', 'utf-8',function(err,dataa) {
    		if(err){
    			response.writeHead(404,{'content-Type': 'text/plain'});
    			response.write("not found");
    			return response.end();
    }
    	response.writeHead(200,{'content-Type': 'text/html'});
    	response.write(dataa);
    	response.end();
    	});
    }

    if(func == 'thermo'){
        thermo(name , func , value);
    }else if(func == 'acc'){
        acc(name , func , value);
    }
}

function acc(name , func , value){
    console.log('加速度データを受信');
    console.log('value: ['+ new Date + "] "+ value);
    data = '[' + new Date + ']' + ' Speed ' + value + '\n';
    fs.appendFile('log/acc.log', data , function (err) {
    });
}

function thermo(name , func , value){
    console.log('温度データを受信');
    console.log('value: ['+ new Date + "] "+ value);

    if(value >= settings.thermo_frozen + 1 && value <= settings.thermo_heat - 1){
        data = '[' + new Date + ']' + ' Safe ' + value + '\n';
    }else if(value <= settings.thermo_frozen){
        data = '[' + new Date + ']' + ' Frozen ' + value + '\n';
    }else if(value >= settings.thermo_fire){
        data = '[' + new Date + ']'+ ' Fire ' + value + '\n';
    }else if(value >= settings.thermo_heat){
        data = '[' + new Date + ']'+ ' Heat ' + value + '\n';
    }else{
        data = 'Error.\n'
    }
    fs.appendFile('log/thermo.log', data , function (err) {
    });
}