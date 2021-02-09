
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const multer = require('multer')
const Catalog = require("../models/catalogue");
const path = require('path')

exports.catelogById = (req, res, next, id) => {
    Catalog.find({}).exec((err, catalog) => {
    if (err || !catalog) {
      return res.status(400).json({
        error: "Business not found"
      });
    }
    req.catalog = catalog;
    next();
  });
}


const storageEngine = multer.diskStorage({
  destination: './public/uploads/',
  fileName: function (req, file, fn) {
    fn(null, req.params.catalogId + path.extName(file.originalName)); //+'-'+file.fieldName
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
          let catalog = await Catalog.findByIdAndUpdate(req.params.catalogId, { $set: { photo: fullPath } }, { new: true });
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




exports.createCatalog = (req, res) => {

    try {
      let newcatalog = new Catalog({
        reviewId: req.body.reviewId,
        Name: req.body.Name,
        Address: req.body.Address,
        companyName: req.body.companyName,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
       
        description: req.body.description,



      });


      newcatalog.save(function (err, business) {
        if (err) {
          console.log(err)
          return res.status(400).json(
            { errors: [{ msg: "Could Not Add catelog" }] });
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

    Catalog.findOneAndDelete({ _id: req.params.catelogId })
      // Category.findOneAndDelete(req.body.phone)

      .then((catelog) => {
        if (!catelog) {

          return res.status(404).json({ msg: "catelog not found" })

        }
        res.send({ message: "catelog deleted successfully!" });
      })
      .catch((err) => {

        return res.status(500).json({ msg: "Could not delete catelog" })

      });
  }
 
// exports.update = (req, res) => {
//   console.log(req.body)
//   Catalog.findByIdAndUpdate(req.params.catelogId,
//     {
//       $set: {
//         Name: req.body.Name, Address: req.body.Address, Registration_date: req.body.Registration_date,
//         Status: req.body.Status, phone: req.body.phone, fax: req.body.fax, website: req.body.website,
//         email: req.body.email,
//         helpline: req.body.helpline,
//         description: req.body.description,
//       }
//     },
//     { new: true })


//     .then((business) => {
//       if (!business) {

//         return res.status(404).send({
//           message: "business not found ",
//         });
//       }
//       return res.status(200).json(business);
//     })
//     .catch((err) => {
//       console.log(err)
//       return res.status(500).send({
//         message: "Could not update business",
//       });
//     });
// }
