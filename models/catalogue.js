var mongoose=require('mongoose');

const CatelogSchema=mongoose.Schema({
  
    Name:{
        type: String,
        required: true,
      
    },
    
    companyName:{
        type: String,
        required: true,
      
    },
    Address:{
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
module.exports=mongoose.model('Catalog',CatelogSchema);