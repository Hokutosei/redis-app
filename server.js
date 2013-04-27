var express = require('express'),
    app = express(),
    fs = require('fs'),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

var redis = require('redis');
//    client = redis.createClient();

REDISCLOUD_URL = 'pub-redis-14396.us-east-1-3.2.ec2.garantiadata.com'
var client = redis.createClient(14396, 'pub-redis-14396.us-east-1-3.2.ec2.garantiadata.com');
var url = require('url'),
    redisUrl = url.parse(process.env.REDISCLOUD_URL);
var client = redis.createClient(redisUrl.port, redisUrl.hostname, { no_ready_check: true});
client.auth(redisUrl.auth.split(':'[1]), function(err) {
    if (err) { console.log('Error ' + err) }
});


//client = client.auth("jinpol", function(err) {
//    console.log('Error' + err)
//});

var port = 8888, localhost = '0.0.0.0';


app.get(/^(.+)$/, function(req, res) {
    res.sendfile('public/' + req.params[0]);
});

//console.log(io.sockets)

//client.on('error', function(err) {
//    console.log('Error ' + err);
//})

io.sockets.on('connection', function(socket) {
    console.log('connection')

    socket.on('sent:Data', function(data) {
        var username = data.username;

        var userKey = 'users:' + username;
        client.hset(userKey, 'testData', data.sentData, redis.print);
        client.hget(userKey, 'testData', redis.print);

        console.log(data)
    })

})


server.listen(port);

console.log('Server is running at ' + localhost + '...' + port);






