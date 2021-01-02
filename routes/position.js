const express = require('express');
const controller = require('../controllers/position');

const router = express.Router();

router.get('/:categoryId', controller.getByCategoryId);
router.post('/', controller.createPosition);
router.delete('/:id', controller.removePosition);
router.patch('/:id', controller.updatePosition);

module.exports = router;
