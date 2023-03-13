// const express = require("express");
// const { body, validationResult } = require("express-validator");

// const app = express();

// app.use(express.json());

// app.post(
//   "/submit-form",
//   [
//     body("name").notEmpty().withMessage("Name is required."),
//     body("email").isEmail().withMessage("Email is invalid."),
//     body("dob")
//       .isDate()
//       .custom((value) => {
//         const age = calculateAge(new Date(value));
//         if (age < 18) {
//           throw new Error("You must be at least 18 years old to submit this form.");
//         }
//         return true;
//       }),
//     body("mobile").matches(/^(\+?\d{1,3}[- ]?)?\d{10}$/).withMessage("Mobile number is invalid."),
//   ],
//   (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     // form data is valid, continue processing
//     const { name, email, dob, mobile } = req.body;
//     // process form data...
//     res.status(200).json({ message: "Form submitted successfully!" });
//   }
// );

// const calculateAge = (birthday) => {
//   const ageDiff = Date.now() - birthday.getTime();
//   const ageDate = new Date(ageDiff);
//   return Math.abs(ageDate.getUTCFullYear() - 1970);
// };

// app.listen(5000, () => {
//   console.log("Server started on port 5000.");
// });

const express=require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const app = express();
app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/submit-form",(req,res)=>{
  let data = req.body;
  // console.log(data);
//   res.send({"message":'hi',
// "data":data
// })
const mobileno=data.mobile;
const mobileregex=/^\d{10}$/;
if (!mobileregex.test(mobileno)) {
  res.status(400).json({ message: 'Invalid mobile number format' });
  return;
}
console.log('Form data:', data);
res.send('Form submitted successfully!');
})
app.listen(5000, () => {
  try{
    console.log("server started on port 5000.");
  }
  catch(err){
    console.log(err);
  }
  })
