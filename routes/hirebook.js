const express=require("express");
const router=express.Router();
const path = require('path');
const multer = require('multer');
const BookSchema = require("../models/bookhire");
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

    router.post('/book/create/',upload.single('image'), function(req, res, next) {
        BookSchema.create(req.body)
            .then((teacher) => {
                console.log('Teacher has been Added ', teacher);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(teacher);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


    router.get('/book/:id', function(req, res, next) {
        BookSchema.findById(req.params.id)
            .then((teacher) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(teacher);
            }, (err) => next(err))
            .catch((err) => next(err));
    
    });


    router.get('/book', function(req, res, next) {
        BookSchema.find({}).exec(function(error, results) {
            if (error) {
                return next(error);
            }
            // Respond with valid data
            res.json(results);
        });
    });




module.exports=router;