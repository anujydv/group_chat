var socket = io();

socket.on('connect', function (msg) {
    console.log("Connected to user", msg);

});

socket.on('disconnect', function () {
    console.log("Disconnected from server");

});
socket.on('newMsg', function (newmsg) {
    console.log("new message",newmsg);
    var li = $('<li></li>');
    li.text(`${newmsg.from}: ${newmsg.text}`);
    $('#msg').append(li);
});

// socket.emit('createMsg', {
//     from: 'frank',
//     text: 'hi'
// }, function (msg) {
//     console.log('got it');
//     console.log(msg);
// });

$('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMsg', {
        from: 'user',
        text: $('[name=name]').val()
    }, function () {});
    $('[name=name]').val("");
});
