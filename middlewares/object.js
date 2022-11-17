module.exports = (req, res, next) => {
    try {
        console.log('I\'m a middleware');
        next();
    }catch {
        res.status(401).json({message: 'middleware error'})
    }
}