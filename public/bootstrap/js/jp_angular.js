'use strict';

var app = angular.module("lxJpNetworkingRedis", []);

app.factory('socket', function($rootScope) {
    var socket = io.connect('http://localhost:8888');
    //var socket = io.connect();
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args)
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});


app.controller('AppCtrl', function($scope, socket) {
    socket.emit('connection');


    console.log(socket)
    $scope.sendData = function(data) {
        //alert('data sent ' + data);
        $scope.testData = '';

        var username = $scope.username;
        socket.emit('sent:Data', { username:username, sentData: data }, function(err, host) {
            if(err) { console.log('error ' + err) }
            else { console.log('sent ' + host) }
        })


    }

})


