const express = require('express');
const passport = require('passport');

const controller = require('../controllers/position');
const router = express.Router();

router.get('/:categoryId', passport.authenticate('jwt', {session: false}), controller.getByCategoryId);
router.post('/', passport.authenticate('jwt', {session: false}), controller.createPosition);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.removePosition);
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.updatePosition);

module.exports = router;
