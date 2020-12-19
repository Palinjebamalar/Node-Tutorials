const Student=require('../model/student')
var validator = require('validator');
var {isEmail,isLength,isMobilePhone,isDate,isEmpty}=validator
exports.create = (req, res) => {
    let body=req.body
console.log("hai")
    //Name should be minimum 3 Characters validation
    if(!(isLength(body.name,{min:3}))){
        res.status(500).send({message:"Name should be minimum 3 Characters"});
    }

    //Check Class is Empty or not
    if(isEmpty(body.class)){
        res.status(500).send({message:"Class is required!"});
    }

    // Email Validation
    if(!(isEmail(body.email))){
        res.status(500).send({message:"Valid Email required!"});
    }
     // Phone Validation
     if(!(isMobilePhone(body.phone))){
        res.status(500).send({message:"Valid Phone number required!"});
    } 
    //Date Validation
    if(!(isDate(body.dateofBirth))){
        res.status(500).send({message:"Date should be in either YYYY/MM/DD or YYYY-MM-DD format!"});
    }

    Student.create(body)

    .then(data => {
        console.log(data)
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:"Some error occurred while creating the Student."
        });
    });
};
