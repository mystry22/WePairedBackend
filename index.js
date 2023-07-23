const express = require('express');
const http = require('http');
const app = express();
const PORT = 4567;
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const cors = require('cors');
const db_conn = require('./config/db');
const { createChannel, allRooms, createConversation, readConversation } = require('./model/ChatModel')
const chat = require('./routes/chat');
const moment = require('moment');

app.use(cors());
app.use(express.json());

app.use('/api/chat', chat);





const format3 = (name, text, key, user_id, room_id) => {
    return {
        name: name,
        text: text,
        createdAt: moment().format('h:m:a'),
        key: key,
        user_id: user_id,
        room_id: room_id
    }
}


io.on('connection', async (socket) => {



    //Welcome user
    //socket.emit('message','Welcome to Wapaired Chat');

    //chat connect

    socket.on('getRooms', async () => {
        const rooms = await allRooms();
        
        if (rooms) {

            socket.emit('roomList', rooms);
        } else {

        }
    });



    //Chat Message
    socket.on('chatMessage', async (msg) => {

        
        // chatArray.push(format3(msg.name, msg.text, msg.key, msg._id, msg.room_id));
        // const uniqueChat = chatArray.filter(
        //     function (el) {
        //         return el.room_id == msg.room_id
        //     }
        // );

        const data = {
            name: msg.name,
            text: msg.text,
            user_id: msg._id,
            key: msg.key,
            channel_id: msg.room_id,
            chat_date: moment().format('h:m:a')
        }


        const readData = {
            channel_id:msg.room_id,
        }

        const saved = await createConversation(data);
        if(saved){

            const readConverse = await readConversation(readData)
            io.to(msg.room_id).emit('message', readConverse);
        }




    });

    //Create room
    socket.on('createRoom', async (data) => {

        const vals = {
            channel_name: data.roomName,
            channel_id: data.room_id,
            channel_slogan: data.slogan
        }
        socket.join(data.room_id);

        const res = await createChannel(vals);

        if (res) {

            socket.emit('messages', 'ok');
        } else {
            socket.emit('messages', 'not okay');

        }


    });

    //Join room
    socket.on('joinRoom', async(user) => {

        socket.join(user.room_id);

        const readData = {
            channel_id:user.room_id,
        }
        const readConverse = await readConversation(readData)
        io.to(user.room_id).emit('message', readConverse);
    })

    //notify user's of some one leaving
    socket.on('disconnect', () => {
        io.emit('message', 'A user has disconnected');
    });



});





server.listen(PORT, () => {
    console.log('Listening to port ' + PORT)
});