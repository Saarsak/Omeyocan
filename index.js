const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const regole = 'Regole: <br>- Fate i buoni<br>- La chat funziona al contrario ( nel senso capovolta )<br>- Questa essere una prova<br>- Tutti i messaggi si perdono se ricaricate la pagina, quindi pensateci bene<br>- Mawdak sta lavorandoci, non pretendete nulla dal momento che fa schifo quanto lui';

app.get('/', function(req, res) {
    res.render('index.ejs');
});


io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + 'Ed ecco : ' + socket.username );
		        io.to(socket.id).emit('private', regole );
    });
	
    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' ci saluta...</i>');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong><font color="#c0c0c0">' + socket.username + '</strong></font>: ' + message);
    });

	});

const server = http.listen(8080, function() {
    console.log('listening on *:8080');
});