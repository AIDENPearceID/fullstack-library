module.exports = function(io){
  io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    socket.on('join', ({ room }) => {
      socket.join(room);
    });

    socket.on('message', ({ room, user, text }) => {
      io.to(room).emit('message', { user, text, at: new Date() });
    });

    socket.on('disconnect', ()=> {
      console.log('socket disconnected', socket.id);
    });
  });
};
