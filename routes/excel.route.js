let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router()
const multer = require('multer');
// Student Model


const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './uploads/');
  },
  filename(req, file, callback) {
    callback(null, `tmp.csv`);
  },
});

const upload = multer({ storage }).single('csv');


// CREATE User
router.route('/create-student').post((req, res, next) => {
  userSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log("data", data)
      res.json(data)
    }
  })
})

//Uploading CSV
router.route('/read-file').post((req, res) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).send({
        message: err.message
      })
    }
    // const csvFilePath = './uploads/tmp.csv';
    // csv()
    //   .fromFile(csvFilePath)
    //   .then(async (jsonObj) => {
    //     for (let i = 0; i < jsonObj.length; i++) {
    //       const item = jsonObj[i]
    //       const student = new userSchema()
    //       student.RUT = item.RUT
    //       student.DV = item.DV
    //       student.NOMBRE = item.NOMBRE
    //       student.DIRECCION = item.DIRECCION
    //       student.COMUNA = item.COMUNA
    //       student.REGION = item.REGION
    //       student.SALUD = item.SALUD
    //       student.Fec_Nac = item.Fec_Nac
    //       student.CORREO = item.CORREO
    //       student.CELULAR = item.CELULAR
    //       await student.save()
    //     }
    //     res.send('Success')
    //   });


  })
})
module.exports = router