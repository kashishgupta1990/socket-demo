var socket = io();
var app;

window.onload = function() {
    app = new Vue({
        el: '#body',
        data: {
            message:'',
            userCount: ''
        },
        methods: {
            textUpdate: function(){
                socket.emit('updatedMessage', this.message);
            }
        }
    });

    socket.on('updatedMessage', function(data){
        app.message = data.message;
    });
    socket.on('userCount', function(data){
        app.userCount = data.message;
    });
};
