var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'),

//Load index page
app.get('/', function(req, res){
  res.sendfile(__dirname + "/index.html");
});

io.socket.on('login', function(socket, username){
  //New client connexion message
  socket.on('new_user', function(username){
    username = ent.encode(username);
    socket.username = username;
    socket.braocast.emit('new_user', username);
  });

  //User send message to others clients
  socket.on('message', function(){
    message = ent.encode(message);
    socket.braocast.emit('message', {username: socket.username, message: message});
  });

});

server.listen(8080);
