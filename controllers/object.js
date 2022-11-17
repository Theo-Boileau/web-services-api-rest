const Object = require('../models/object');


/**
 * returns all objects list
 * @param req params request
 * @param res result of the request
 * @param next
 */
exports.getObjectList = (req, res, next) => {
    console.log('calling getObjectList');

    Object.find()
        .then((list) => {
            res.status(200).json(list)
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({message: 'NOT FOUND'});
        });
}

/**
 * returns an object found with its id
 * @param req params request
 * @param res result of the request
 * @param next
 */
exports.getObject = (req, res, next) => {
    console.log('calling getObject', req.params);

    Object.findById(req.params.id)
        .then((obj) => {
            res.status(200).json(obj)
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({message: 'NOT FOUND'});
        });
}

/**
 * create an object
 * @param req params request
 * @param res result of the request
 * @param next
 */
exports.createObject = (req, res, next) => {
    console.log('calling createObject', req.body);

    let obj = new Object({
        name: req.body.name,
        weight: req.body.weight,
        url: req.body.url,
        creationDate: new Date(),
        modificationDate: new Date(),
        active: true
    });

    obj.save()
        .then((saved) => {
            res.status(200).json(saved);
        })
        .catch(() => {
            res.status(500).json({message: 'REST API ERROR : creation error'});
        });
}

/**
 * update an object
 * @param req params request
 * @param res result of the request
 * @param next
 */
exports.updateObject = (req, res, next) => {
    console.log('calling updateObject : ' + req.params, req.body);

    Object.findById(req.params.id)
        .then((obj) => {
            req.body.modificationDate = new Date();

            Object.updateOne({
                _id: obj.id
            }, req.body)
                .then((updated) => {
                    res.status(200).json(updated);
                })
                .catch(() => {
                    res.status(500).json({message: 'REST API ERROR : update error'});
                })
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({message: 'NOT FOUND'});
        });
}

/**
 * delete an object with its id
 * @param req params request
 * @param res result of the request
 * @param next
 */
exports.deleteObject = (req, res, next) => {
    console.log('calling deleteObject : ' + req.params.id);

    Object.findByIdAndDelete(req.params.id)
        .then((result) => {
            if (result != null) {
                res.status(200).json(result);
            } else {
                res.status(500).json({message: 'ALREADY DELETED'});
            }

        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({message: 'NOT FOUND', error: err});
        });
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