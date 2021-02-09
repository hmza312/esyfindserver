var mongoose=require('mongoose');

const SpecialSchema=mongoose.Schema({
  
    Name:{
        type: String,
        required: true,
      
    },
    company_name:{
        type:String,
      
    },
    amount:{
        type:String,
     

    },
    start_date:{
        type:String,
        required: true,
      

    },
    end_date:{
        type:String,
        required: true,
      

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
module.exports=mongoose.model('Special',SpecialSchema);