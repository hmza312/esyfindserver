var mongoose=require('mongoose');

const HireSchema=mongoose.Schema({
  
    Name:{
        type: String,
        required: true,
      
    },
    
    price:{
        type: String,
        required: true,
      
    },
    rating:{
        type:String,
      
    },
 

   
    description:{
        type: String
    },
    image:{
        type: String
    },
   
});
module.exports=mongoose.model('Hire',HireSchema);