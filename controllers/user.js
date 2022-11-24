const User = require('../models/user');
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const {Oauth, OAuth2Client} = require('google-auth-library');

const CLIENT_ID = process.env.CLIENT_ID;

const client = new OAuth2Client(CLIENT_ID);

async function verify(token, req, res){
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    console.log(payload);
}

/**
 * returns all users list
 * @param req params request
 * @param res result of the request
 * @param next
 */
exports.getUserList = (req, res, next) => {
    console.log('calling getUserList');

    User.find()
        .then((list) => {
            res.status(200).json(list)
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({message: 'NOT FOUND'});
        });
}

/**
 * returns a user found with its id
 * @param req params request
 * @param res result of the request
 * @param next
 */
exports.getUser = (req, res, next) => {
    console.log('calling getUser', req.params);

    User.findById(req.params.id)
        .then((user) => {
            res.status(200).json(user)
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({message: 'NOT FOUND'});
        });
}

/**
 * create a user
 * @param req params request
 * @param res result of the request
 * @param next
 */
exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            let user = new User({
                email: req.body.email,
                password: hash,
                creationDate: new Date(),
                modificationDate: new Date(),
                active: true
            });

            user.save()
                .then((saved) => {
                    res.status(200).json(saved);
                })
                .catch(() => {
                    res.status(500).json({message: 'REST API ERROR : creation error'});
                });
        })
        .catch((err) => {
            res.status(500).json({message: 'REST API ERROR : encrypting error'});
        })
}

/**
 * log user and return a token
 * @param req params request
 * @param res result of the request
 * @param next
 */
exports.login = (req, res, next) => {

    console.log(req.body);
    let token = req.body.token;

    if (token) {
        // verify(token, req, res).catch(console.log(error);
        res.status(200).json({message: 'ok'});
    } else {
        User.findOne({"email": req.body.email})
            .then((user) => {
                if (!user) {
                    res.status(401).json({message: 'USER RESULT NULL'});
                } else {
                    bcrypt.compare(req.body.password, user.password)
                        .then((valid) => {
                            if (!valid) {
                                res.status(500).json({message: 'REST API ERROR : COMPARISON FAILED'});
                            } else {
                                const token = jsonWebToken.sign({userId: user._id}, 'RANDOM_TOKEN_SECRET', {expiresIn: '24h'});
                                res.status(200).json({
                                    token: token,
                                    user: user
                                })
                            }
                        })
                        .catch(() => {
                            res.status(500).json({message: 'REST API ERROR : COMPARISON FAILED'});
                        });
                }

            })
            .catch((err) => {
                console.log(err);
                res.status(404).json({message: 'NOT FOUND'});
            });
    }
}

/**
 * update a user
 * @param req params request
 * @param res result of the request
 * @param next
 */
exports.updateUser = (req, res, next) => {
    console.log('calling updateUser : ' + req.params, req.body);

    User.findById(req.params.id)
        .then((user) => {
            req.body.modificationDate = new Date();

            User.updateOne({
                _id: user.id
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
 * delete a user with its id
 * @param req params request
 * @param res result of the request
 * @param next
 */
exports.deleteUser = (req, res, next) => {
    console.log('calling deleteUser : ' + req.params.id);

    User.findByIdAndDelete(req.params.id)
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