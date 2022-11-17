const Object = require('../models/object');

exports.getObjectList = (req, res, next) => {
    console.log('calling getObjectList');

    Object.find()
        .then((list) => {
            res.status(200).json(list)
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({message: 'NOT FOUND'});
        })
}

exports.getObject = (req, res, next) => {
    console.log('calling getObject', req.params);

    Object.findById(req.params.id)
        .then((obj) => {
            res.status(200).json(obj)
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({message: 'NOT FOUND'});
        })
}

exports.createObject = (req, res, next) => {
    res.status(200).json({message: "OK"});
}

exports.updateObject = (req, res, next) => {
    res.status(200).json({message: "OK"});
}

exports.deleteObject = (req, res, next) => {
    res.status(200).json({message: "OK"});
}

// const obj = new Object({
//     name: 'Tabouret',
//     weight: 2,
//     url: '',
//     creationDate: new Date(),
//     modificationDate: new Date(),
//     active: true
// })
//
// obj.save()
//     .then((saved) => {
//         console.log('OK', saved);
//     })
//     .catch((err) => {
//         console.log('ERROR', err);
//     })