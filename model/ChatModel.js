const Channel = require('../model_schema/Channel_Schema');
const Conversations = require('../model_schema/Conversation_Schema');


const allRooms = async function(){
    const prodExist = await Channel.find({});
    return prodExist;
}

const createChannel = async function(data){
    const chan = new Channel(data);
    const resp = await chan.save();
    if(resp){
        const rooms = await allRooms();
        return rooms;
    }else{
        return 'error';
    }
}

const createConversation = async function(data){
    const converse = new Conversations(data);
    const resp = await converse.save();
    if(resp){
        return 'ok'
    }else{
        return 'error';
    }
}

const readConversation = async function(data){

    const conversations = await Conversations.find(data);
    return conversations;
    
}

// const sumCartItems = async function(myip){
    
//     const cart = await Cart.find({user_ip: myip}).countDocuments();
//     return cart;
// }

// const getCartItems = async function(ip){
//     const cartItems = await Cart.find({user_ip : ip});
//     return cartItems;
// }

// const getSubTotal = async function(ip){
//     const subTotal = await Cart.aggregate(
//         [
//             {$match: {}},
//             {$group  : {_id: "$user_ip",subtotal :{$sum : "$subtotal"}}}
//         ]
//     );
//     return subTotal;
// }
// const deleteCartItem = async function(prod_id,user_ip){
//     const data = {
//         prod_id: prod_id, $and : [{user_ip : user_ip}]
//     }
//     const deleteOne = await Cart.deleteOne(data);
//     return true;
//    }
// const deleteManyCartItems = async function(user_ip){
//     const data = {
//         user_ip: user_ip
//     }

//     const deleteMany = await Cart.deleteMany(data);
//     if(deleteMany){
//         return 'ok'
//     }
// }

module.exports.createChannel = createChannel;
module.exports.allRooms = allRooms;
module.exports.createConversation = createConversation;
module.exports.readConversation = readConversation;
