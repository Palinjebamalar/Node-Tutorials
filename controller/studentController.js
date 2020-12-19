const Student=require('../model/student')

exports.create = (req, res) => {
    let body=req.body

    //Name should be minimum 3 Characters validation
    if(body.name.length<3){
        console.log("hai")
        res.status(500).send({message:"Name should be minimum 3 Characters"});
    }

    //Check Class is Empty or not
    else if(body.class==='' || body.class===undefined){
        res.status(500).send({message:"Class is required!"});
    }

    // Email Validation
    else if(!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(body.email))){
        res.status(500).send({message:"Valid Email required!"});
    }
     // Phone Validation
    else if(!(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test(body.phone))){
        res.status(500).send({message:"Valid Phone number required!"});
    } 
    //Date Validation
    else if(!(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(body.dateofBirth))){
        res.status(500).send({message:"Date should be in either DD/MM/YYYY or DD-MM-YYYY format!"});
    }
    else{
    Student.create(body)
    .then(data => {
        console.log(data)
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:"Some error occurred while creating the Student."
        });
    });
}
};
