
const Company = require("../models/company");

exports.companyById=(req,res,next,id)=>{
    Company.find({}).exec((err,company)=>{
        if (err || !company){
            return res.status(400).json({
                error:"Company not found"
            });
        }
        req.company=company;
        next();
    });
}

exports.read = function (req, res) {

    Company.find({} ,function (err, company) {
            // console.log(req.params.companyId,)

        if (err) return next(err);
        res.send(company);
    })
    }

exports.createCompany = (req, res) => {
  const { name,category,firstname,lastname,mobilenumber,email,password,password2,province,city, suburb } = req.body;
      Company.findOne({name},(err,user)=>{
          if(err)
              res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
          if(user)
              res.status(400).json({message : {msgBody : "Companyname is already taken", msgError: true}});
          else{
              const newCompany = new Company({name,category,firstname,lastname,mobilenumber,email,password,password2,province,city, suburb });
              newCompany.save(err=>{
                  if(err)
                      res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
                  else
                      res.status(201).json({message : {msgBody : "Account successfully created", msgError: false}});
              });
          }
      });
     
          
}; 