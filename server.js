const express=require('express');
const mongoose= require('mongoose');
const bodyparser=require('body-parser');
const cookieParser=require('cookie-parser');
const User=require('./models/user');
const {auth} =require('./middleware/auth');
const db=require('./config/config').get(process.env.NODE_ENV);


const app=express();
// app use
app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());
app.use(cookieParser());

// database connection
mongoose.Promise=global.Promise;
mongoose.connect(db.DATABASE,{ useNewUrlParser: true,useUnifiedTopology:true },function(err){
    if(err) console.log(err);
    console.log("database is connected");
});


app.get('/',function(req,res){
    res.status(200).send(`Welcome to login , sign-up api`);
});

// adding new user (sign-up route)
app.post('/api/register',function(req,res){
  // taking a user
  const newuser=new User(req.body);
  console.log('fb',req.body)
 if(newuser.password!=newuser.password2)return res.status(400).json({message: "password not match"});
  
  User.findOne({email:newuser.email},function(err,user){
      if(user) return res.status(400).json({ auth : false, message :"email exits"});

      newuser.save((err,doc)=>{
          if(err) {console.log(err);
              return res.status(400).json({ success : false});}
          res.status(200).json({
              succes:true,
              user : doc
          });
      });
  });
});
// login user
app.post('/api/login', function(req,res){
  let token=req.cookies.auth;
  User.findByToken(token,(err,user)=>{
      if(err) return  res(err);
      if(user) return res.status(400).json({
          error :true,
          message:"You are already logged in"
      });
  
      else{
          User.findOne({'email':req.body.email},function(err,user){
              if(!user) return res.json({isAuth : false, message : ' Auth failed ,email not found'});
      
              user.comparepassword(req.body.password,(err,isMatch)=>{
                  if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});
      
              user.generateToken((err,user)=>{
                  if(err) return res.status(400).send(err);
                  res.cookie('auth',user.token).json({
                      isAuth : true,
                      id : user._id
                      ,email : user.email,
                      role:user.role
                  });
              });    
          });
        });
      }
  });
});
// get logged in user
app.get('/api/profile',function(req,res){
  res.json({
    
      email: req.body.email,
      
  })
});
//logout user
app.get('/api/logout',auth,function(req,res){
  req.user.deleteToken(req.token,(err,user)=>{
      if(err) return res.status(400).send(err);
      res.sendStatus(200);
  });

}); 

// listening port
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
});