const mongoose = require('mongoose');

const Channel = new mongoose.Schema({
   
    channel_name: {
        type: String,
        min: 2,
        max: 1005
    },

    channel_id: {
        type: String,
        min: 2,
        max: 1005
    },
    channel_slogan: {
        type: String,
        min: 2,
        max: 1005
    },
    
    
    
    
    
 
});

module.exports = mongoose.model('Channel',Channel);