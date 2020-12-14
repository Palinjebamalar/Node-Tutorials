const Student=require('../model/student')

exports.updateMany = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Name Required"
        });
    }

    // Find note and update it with the request body
    Student.updateMany({name:"Palin"}, {"$set":{name:req.body.name}})
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.id
            });
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Student with id " + req.params.id
        });
    });
};
