const Student=require('../model/student')

exports.create = (req, res) => {

    const student = new Student({name:req.body.name,class:req.body.class});
    student.save(function (err) {
  if (err) {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the Student."
    });
  }
  return res.send(student);
});
    
};
