var mongoose=require('mongoose');

const BusinessSchema=mongoose.Schema({
  
    Name:{
        type: String,
        required: true,
      
    },
    Address:{
        type:String,
      
    },
    image:{
        type:String,
     

    },
    Registration_date:{
        type:String,
        required: true,
      

    },
    Status:{
        type: String
    },
    phone:{
        type: String
    },
    fax:{
        type: String
    },
    website:{
        type: String
    },
    email:{
        type: String
    },
    helpline:{
        type: String
    },
    description:{
        type: String
    },
    image:{
        type: String
    },
    reviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Review"
    }
});
module.exports=mongoose.model('Bussiness',BusinessSchema);