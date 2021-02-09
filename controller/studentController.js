const Student=require('../model/student')

exports.getAll = (req, res) => {
    Student.find().limit(3)

    .then(data => {
        console.log(data)
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:"Some error occurred while creating the Student."
        });
    });
};
