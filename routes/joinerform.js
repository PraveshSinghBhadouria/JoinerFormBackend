var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

/* GET users listing. */
const picture = upload.fields([{name:'paySlip',maxCount:1},{name:'signature',maxCount:1},{name:'photo',maxCount:1},{name:'degreeDiplomaPicture',maxCount:1}])
router.post('/add_new_joiner',picture, function(req, res, next) {
  console.log(req.body)
  console.log(req.files)
  const files = req.files;
  if (!files) {
      // console.log(error)
      res.status(400).json({Status:false,message:'Server error....'})
  }



pool.query("insert into joinerform  (fullName, dob, gender, nationality, fullPermanentAddress, currentAddress, city, postcode_Pincode, emailAddress, countryCode, referenceContactNumber, contactNumber, bankName, accountNumber, sortCode_IFSCCode, emergencyContactFullName, relationship, emergencyContactsPhoneNumber, companyName, positionHeld, employementDates, reasonForLeaving, secondCompanyName, secondPositionHeld, secondEmployementDates, secondReasonForLeaving, paySlip, degreeDiplomaPicture, nameOfDegreeDiploma, photo, referenceName, referenceCompany, referencePosition, referenceEmail, secondReferenceName, secondReferenceCompany, secondReferencePosition, secondReferenceContactNumber, secondReferenceEmail, nationalInsuranceNumber, taxCode, signature, date)      values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.fullName, req.body.dob, req.body.gender, req.body.nationality, req.body.fullPermanentAddress, req.body.currentAddress, req.body.city, req.body.postcode_Pincode, req.body.emailAddress, req.body.countryCode, req.body.referenceContactNumber, req.body.contactNumber, req.body.bankName, req.body.accountNumber, req.body.sortCode_IFSCCode, req.body.emergencyContactFullName, req.body.relationship, req.body.emergencyContactsPhoneNumber, req.body.companyName, req.body.positionHeld, req.body.employementDates, req.body.reasonForLeaving, req.body.secondCompanyName, req.body.secondPositionHeld, req.body.secondEmployementDates, req.body.secondReasonForLeaving, req.files.paySlip[0].filename, req.files.degreeDiplomaPicture[0].filename, req.body.nameOfDegreeDiploma, req.files.photo[0].filename, req.body.referenceName, req.body.referenceCompany, req.body.referencePosition, req.body.referenceEmail, req.body.secondReferenceName, req.body.secondReferenceCompany, req.body.secondReferencePosition, req.body.secondReferenceContactNumber, req.body.secondReferenceEmail, req.body.nationalInsuranceNumber, req.body.taxCode, req.files.signature[0].filename, req.body.date],function(error,result){
 if(error)
 { console.log("xxxxx"+error)
  res.status(500).json({status:false,message:'Server error....'})
 }
 else
 {
  res.status(200).json({status:true,message:"Submit"})
}

})
});




router.get('/fetch_all_joiner_record', function(req, res, next) {
  pool.query("select * from joinerform",function(error,result){
   if(error)
   { console.log(error)
    res.status(500).json({status:false,message:'Server error....'})
   }
   else
   {
    res.status(200).json({status:true,data:result})
   }

  })
}); 


module.exports = router;


