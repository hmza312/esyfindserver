const express=require("express");
const router=express.Router();
const path = require('path');
const multer = require('multer');
const Business = require("../models/bussines");
    const auth= require('../middleware/auth');
    router.use('/uploads', express.static(path.join(__dirname, '/uploads')));
    
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {  
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg'|| file.mimetype == 'image/gif') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

    router.post('/business/create/',upload.single('image'), function(req, res, next) {
        Business.create(req.body)
            .then((teacher) => {
                console.log('Teacher has been Added ', teacher);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(teacher);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


    router.get('/bussines/:id', function(req, res, next) {
        Business.findById(req.params.id)
            .then((teacher) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(teacher);
            }, (err) => next(err))
            .catch((err) => next(err));
    
    });


    router.get('/bussines', function(req, res, next) {
        Bussines.find({}).exec(function(error, results) {
            if (error) {
                return next(error);
            }
            // Respond with valid data
            res.json(results);
        });
    });




module.exports=router;