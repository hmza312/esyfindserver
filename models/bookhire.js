var mongoose=require('mongoose');

const BookSchema=mongoose.Schema({
  
    Name:{
        type: String,
        required: true,
      
    },
    
    price:{
        type: String,
        required: true,
      
    },
    start_date:{
        type:String,
      
    },
    end_date:{
        type:String,
      
    },
    days:{
        type:String,
        required: true,
      

    },
   
    description:{
        type: String
    },
    image:{
        type: String
    },
    total:{
        type:String
    },
   
});
module.exports=mongoose.model('Book',BookSchema);