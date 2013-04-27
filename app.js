var redis = require('redis'),
    client = redis.createClient();

client.on('error', function(err) {
    console.log('Error ' + err);
});

//set a value
//client.set('string key', 'hello world', redis.print);
//
//client.get('string key', function(err, reply) {
//    console.log(reply.toString());
//});
//
//client.quit();


client.set('string_key', 'string val', redis.print);
client.hset('hash_key', 'hashtest 1', 'some value', redis.print);

client.hset(['hash_key', 'hashtest 2', 'some other value'], redis.print);
client.hkeys('hash_key', function(err, replies) {
    console.log(replies.length + ' replies:');
    replies.forEach(function(reply, i) {
        console.log('   ' + i + ': ' + reply);
    });
    client.quit();
})