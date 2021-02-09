const Student=require('../model/student')

exports.getAll = (req, res) => {
    Student.find().sort({name: 1})

    .then(data => {
        console.log(data)
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:"Some error occurred while creating the Student."
        });
    });
};
