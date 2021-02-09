const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const companySchema = new mongoose.Schema(
    {  
         userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        category: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        firstname: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32 
        },
        lastname: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        mobilenumber:{
            type: Number,
            trim: true,
            required: true,
            maxlength: 32
        },
        email:{
            type: String,
            required: true,
            trim: true,
            unique: 1
        },
        password:{
            type:String,
            required: true,
            minlength:8
        },
        password2:{
            type:String,
            required: true,
            minlength:8
    
        },
        province:{
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        city:{
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },

       suburb:{
        type: String,
        trim: true,
        required: true,
        maxlength: 32
       }
     
    },
    
    { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);