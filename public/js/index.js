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

socket.on('newLocationMsg',function(newLocMsg){
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');
    li.text(`${newLocMsg.from} : `);
    a.attr('href',newLocMsg.url);
    li.append(a);
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

var locbut =  $("#send-location");
locbut.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geoloction not supported');
    }
    locbut.attr('disabled','disabled');
    navigator.geolocation.getCurrentPosition(function(pos){
        locbut.removeAttr('disabled');
        socket.emit('createLocationMessage',{
            lat:pos.coords.latitude,
            lon:pos.coords.longitude
        });
    },function(){
        locbut.removeAttr('disabled');
        alert('Unable to fetch location');
    });
});
