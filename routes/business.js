const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const businessController = require('../controllers/business');

// routes
router.get('/', verifyToken(), businessController.getAll);
router.get('/current', verifyToken(), businessController.getCurrent);
router.get('/:id', verifyToken(), businessController.getById);
router.put('/:id', verifyToken(),  businessController.update);
router.delete('/:id', verifyToken(), businessController._delete);


module.exports = router;
