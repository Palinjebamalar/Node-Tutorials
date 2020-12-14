const Student=require('../model/student')

exports.delete = (req, res) => {
    Student.remove()
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.id
            });
        }
        res.send({message: "Student deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete student with id " + req.params.id
        });
    });
};