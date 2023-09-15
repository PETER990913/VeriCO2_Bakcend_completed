let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router()
const multer = require('multer');
// Student Model
// var XLSX = require('xlsx')
var xlsx = require('node-xlsx');


const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './uploads/');
  },
  filename(req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage }).single('csv');

const isNumber = (str) => /^\d+$/.test(str);

const getNumber = (str) => {
  if (!isNumber(str)) {
    const number = parseFloat(str.replace(/,/g, ""));
    return isNaN(number) ? null : number;
  }
  return parseFloat(str, 10);
};



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
  upload(req, res, function (err, file) {
    if (err) {
      return res.status(500).send({
        message: err.message
      })
    }

    console.log(req.file.path)
    
var obj = xlsx.parse(req.file.path); // parses a file

let data = obj[0].data;
let f = 0;
let data_ = [], data__ = [];
for(i in data){
    let record = data[i];
    console.log(record.length)
    if(record.length == 0){
        f = 0;
        if(data_.length){
            data__.push(data_)
            data_= []
        }
    }
    else if(`${record[0]}`.includes('Category')){
        f = 1;
    }
    if(f){
        let arr = [];
        for(let j in record){
            let number = getNumber(`${record[j]}`)
            if(number)
                arr.push(number);
        }  
        if(arr.length > 1)
            data_.push(arr);
    }
}
console.log('------', data__)
res.send({data: data__[0]});
// var obj = xlsx.parse(fs.readFileSync(__dirname + req.file.path));
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



// const express = require('express');
// const multer = require('multer');

// const app = express();
// const upload = multer({ dest: 'uploads/' });

// app.post('/upload', upload.single('file'), (req, res) => {
//   const file = req.file;
//   // Process the uploaded file as needed
//   // ...

//   res.json({ message: 'File uploaded successfully' });
// });

// module.exports = express.Router