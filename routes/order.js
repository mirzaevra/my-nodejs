const express = require('express');
const controller = require('../controllers/order')

const router = express.Router();

router.get('/', controller.getOreders);
router.post('/', controller.craeteOrder);

module.exports = router;
