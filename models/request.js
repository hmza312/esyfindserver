var mongoose=require('mongoose');

const RequestSchema=mongoose.Schema({
  
    title:{
        type: String,
        required: true,
      
    },
    
    category:{
        type: String,
        required: true,
      
    },
    subcategory:{
        type:String,
      
    },
 
    date:{
        type:String,
        required: true,
      

    },
    time:{
        type:String,
        required: true,
      

    },
    description:{
        type: String
    },
    image:{
        type: Array
    },
    File:{
        type: Array
    }, 
});
module.exports=mongoose.model('Request',RequestSchema);