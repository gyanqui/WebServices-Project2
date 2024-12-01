const router = require('express').Router();
const sellersController = require('../controllers/sellers');
const { sellerValidationRules, validate } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authentication');

/* CRUD routes */
router.get('/', sellersController.getAll);
router.get('/:id', sellersController.getSingle);
router.post('/', isAuthenticated, sellerValidationRules(), validate, sellersController.createSeller);
router.put('/:id', isAuthenticated, sellerValidationRules(), validate, sellersController.updateSeller);
router.delete('/:id', isAuthenticated, sellersController.deleteSeller);

module.exports = router;