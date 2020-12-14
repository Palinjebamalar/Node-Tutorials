const Student=require('../model/student')

exports.update = async(req, res) => {

    let student, err;
   [student,err] =await(Student.find({_id:req.params.id}));
    if(err){
        return res.send(err)
    }
    if(!student){
        return res.status(404).send({
            message: "Student not found with id " + req.params.id
        });  
    }
        student.name=req.body.name;
        student.class=req.body.class;
        student.save();
        res.send(student);

};
