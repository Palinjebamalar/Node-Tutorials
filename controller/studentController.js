const Student=require('../model/student')

exports.create = (req, res) => {
    Student.insertMany(req.body)

    .then(data => {
        console.log(data)
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:"Some error occurred while creating the Student."
        });
    });
};
