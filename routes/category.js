const express = require('express');
const controller = require('../controllers/category')

const router = express.Router();

router.get('/', controller.getAllCategories);
router.get('/:id', controller.getCategoryById);
router.post('/', controller.createCategory);
router.delete('/:id', controller.removeCategory);
router.patch('/:id', controller.updateCategory);

module.exports = router;
