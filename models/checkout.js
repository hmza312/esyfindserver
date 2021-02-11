var mongoose=require('mongoose');

const CheckoutSchema=mongoose.Schema({
  
    Name:{
        type: String,
        required: true,
      
    },
    
    price:{
        type: String,
        required: true,
      
    },
    companyname:{
        type:String,
      
    },
    method:{
        type:String,
      
    },
    Address:{
        HouseNo:{
            type:String
        },
        Street:{
            type:String
        },
       City:{
            type:String
        },
        Country:{
            type:String
        },
      

    },
   
    accountNumber:{
        type: String
    },
    image:{
        type: String
    },
   
   
});
module.exports=mongoose.model('Checkout',CheckoutSchema);