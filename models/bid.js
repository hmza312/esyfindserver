var mongoose=require('mongoose');

const BidSchema=mongoose.Schema({
  
    Name:{
        type: String,
        required: true,
      
    },
    
    lastbid:{
        type: String,
        required: true,
      
    },
    rating:{
        type:String,
      
    },
 
    start_date:{
        type:String,
        required: true,
      

    },
   
    description:{
        type: String
    },
    image:{
        type: String
    },
   
});
module.exports=mongoose.model('Bid',BidSchema);