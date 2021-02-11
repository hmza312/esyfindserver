var mongoose=require('mongoose');

const ProductSchema=mongoose.Schema({
  
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
 
    companyname:{
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
module.exports=mongoose.model('Products',ProductSchema);