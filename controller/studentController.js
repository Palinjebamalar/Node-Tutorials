const Student=require('../model/student')

exports.getById = (req, res) => {
    Student.findById(req.params.id)

    .then(data => {
        console.log(data)
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:"Some error occurred while creating the Student."
        });
    });
};
