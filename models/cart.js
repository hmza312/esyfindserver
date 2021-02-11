var mongoose=require('mongoose');

const CartSchema=mongoose.Schema({
  
    Name:{
        type: String,
        required: true,
      
    },
    
    price:{
        type: String,
        required: true,
      
    },
    quantity:{
        type:String,
      
    },
 
    companyname:{
        type:String,
        required: true,
      

    },
   
   
    image:{
        type: String
    },
   
});
module.exports=mongoose.model('Cart',CartSchema);