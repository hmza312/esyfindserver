
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const multer = require('multer')
const Business = require("../models/bussines");
const path = require('path')

exports.businessById = (req, res, next, id) => {
  Business.find({}).exec((err, business) => {
    if (err || !business) {
      return res.status(400).json({
        error: "Business not found"
      });
    }
    req.business = business;
    next();
  });
}


const storageEngine = multer.diskStorage({
  destination: './public/uploads/',
  fileName: function (req, file, fn) {
    fn(null, req.params.businessId + path.extName(file.originalName)); //+'-'+file.fieldName
  }
});
const upload = multer({

  storage: storageEngine,
  limits: { fileSize: 200000 },
  fileFilter: function (req, file, callback) {

    validateFile(file, callback);
  }
}).single('photo');
var validateFile = function (file, cb) {
  allowedFileTypes = /jpeg|jpg|png|gif/;
  const extension = allowedFileTypes.test(path.extName(file.originalName).toLowerCase());
  const mimeType = allowedFileTypes.test(file.mimetype);
  if (extension && mimeType) {
    return cb(null, true);
  } else {
    cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
  }
}

exports.uploadBusinessPhoto = (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      let msg = null
      if (error.message)
        msg = error.message
      else
        msg = error
      console.log(msg)
      // return res.status(400).json({ errors: [{ msg: msg }] });
    } else {
      if (req.file == undefined) {

        return res.status(404).json({ errors: [{ msg: 'Image does not exist' }] });
      } else {             /**
                 * Create new record in mongoDB
                 */
        var fullPath = "uploads/" + req.file.fileName;


        try {
          console.log(req.params)
          let business = await Business.findByIdAndUpdate(req.params.businessId, { $set: { photo: fullPath } }, { new: true });
          console.log(business)

          return res.status(200).json({ msg: "Image uploaded successfully" })
        }
        catch (err) {
          // return res.status(404).json({ errors: [{ msg: 'Image could not be uploaded' }] })
          console.log("image could not upload")
        }

      }
    }
  })




  if (!req.files) {
    return res.status(400).json({ message: "Please upload an image" });
  }

}




exports.createBusiness = (req, res) => {

    try {
      let newBusiness = new Business({
        reviewId: req.body.reviewId,
        Name: req.body.Name,
        Address: req.body.Address,
        Registration_date: req.body.Registration_date,
        phone: req.body.phone,
        Status: req.body.Status,
        fax: req.body.fax,
        website: req.body.website,
        email: req.body.email,
        helpline: req.body.helpline,
        description: req.body.description,



      });


      newBusiness.save(function (err, business) {
        if (err) {
          console.log(err)
          return res.status(400).json(
            { errors: [{ msg: "Could Not Add Business" }] });
        } else {
          return res.status(200).json(business);
        }

      });
    }
    catch (err) {
      return res.status(404).json({ errors: [{ msg: 'Image could not be uploaded' }] })
    }



};





exports.remove = (req, res) => {

    Business.findOneAndDelete({ _id: req.params.businessId })
      // Category.findOneAndDelete(req.body.phone)

      .then((business) => {
        if (!business) {

          return res.status(404).json({ msg: "Business not found" })

        }
        res.send({ message: "business deleted successfully!" });
      })
      .catch((err) => {

        return res.status(500).json({ msg: "Could not delete business" })

      });
  }
 
exports.update = (req, res) => {
  console.log(req.body)
  Business.findByIdAndUpdate(req.params.businessId,
    {
      $set: {
        Name: req.body.Name, Address: req.body.Address, Registration_date: req.body.Registration_date,
        Status: req.body.Status, phone: req.body.phone, fax: req.body.fax, website: req.body.website,
        email: req.body.email,
        helpline: req.body.helpline,
        description: req.body.description,
      }
    },
    { new: true })


    .then((business) => {
      if (!business) {

        return res.status(404).send({
          message: "business not found ",
        });
      }
      return res.status(200).json(business);
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).send({
        message: "Could not update business",
      });
    });
}
