const express = require('express'); //framework
const router = express.Router(); // router that is integrated in express

//middleware import
const objectMiddleware = require('../middlewares/object');

// controllers import
const objectController = require('../controllers/object');

// available routes (CRUD - get/post/put/delete)
router.get('/', objectController.getObjectList);
router.get('/:id', objectMiddleware, objectController.getObject);
router.post('/', objectMiddleware, objectController.createObject);
router.put('/:id', objectMiddleware, objectController.updateObject);
router.delete('/:id', objectMiddleware, objectController.deleteObject);

module.exports = router;