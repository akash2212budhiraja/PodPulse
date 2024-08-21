const mongoose = require("mongoose");

const podcasts = new mongoose.Schema({
    frontImage : {
        type : String,
        required : true,
    },
    audioFile : {
        type : String,
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    user :
        {
            type:mongoose.Types.ObjectId,
            ref:"user",
        },
    category :
    {
        type:mongoose.Types.ObjectId,
        ref:"category",
    },
},
{
    timestamps : true
});

module.exports = mongoose.model("podcasts", podcasts);