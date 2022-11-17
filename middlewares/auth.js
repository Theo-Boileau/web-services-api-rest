const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
    try {
        console.log('I\'m a middleware');

        const email = req.headers.email;
        const token = req.headers.authorization;
        const decodeToken = jsonWebToken.verify(token, 'RANDOM_TOKEN_SECRET');

        console.log('**', decodeToken);

        User.findById(decodeToken.userId)
            .then((user) => {
                if(email === user.email){
                    next();
                }else {
                    res.status(403);
                }
            })
            .catch(() => res.status(403))
    }catch {
        res.status(403).json({message: 'middleware error'})
    }
}