const mongoose = require('mongoose');

const Conversations = new mongoose.Schema({
   
    key: {
        type: String,
        min: 2,
        max: 1005
    },

    user_id: {
        type: String,
        min: 2,
        max: 1005
    },
    name: {
        type: String,
        min: 2,
        max: 1005
    },
    text: {
        type: String,
        min: 2,
        max: 1005
    },
    chat_date: {
        type: String,
        min: 2,
        max: 1005
    },
    channel_id: {
        type: String,
        min: 2,
        max: 1005
    },
    
    
    
    
    
 
});

module.exports = mongoose.model('Conversations',Conversations);