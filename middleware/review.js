
const Review = require("../models/review");


exports.reviewById=(req,res,next,id)=>{
    Review.find({}).exec((err,review)=>{
        if (err || !review){
            return res.status(400).json({
                error:"Review does not exist"
            });
        }
        req.review=review;
        next();
    });
}

exports.create = (req, res) => {
      const {name} = req.body;

      const review = new Review({name:name, companyId: req.company.id, userId: req.user.id});
    review.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
}

exports.read=(req,res)=>{

   return res.json(req.review);
}



