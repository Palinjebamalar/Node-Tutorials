const Student=require('../model/student')

exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Name Required"
        });
    }

    // Create a Note

    Student.create({name:req.body.name,class:req.body.class})

    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Student."
        });
    });
};

exports.findAll = (req, res) => {
    Student.find()
    .then(student => {
        res.send(student);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Students."
        });
    });
};

exports.findOne = (req, res) => {
    Student.findById(req.params.id)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "student not found with id " + req.params.id
            });            
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "student not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.id
        });
    });
};

exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Name Required"
        });
    }

    // Find note and update it with the request body
    Student.updateOne({_id:req.params.id}, { name:req.body.name,class:req.body.class})
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

exports.delete = (req, res) => {
    Student.findByIdAndRemove(req.params.id)
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