const Student=require('../model/student')

exports.getByName = (req, res) => {
    Student.find({name:req.params.name})

    .then(data => {
        console.log(data)
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:"Some error occurred while creating the Student."
        });
    });
};
