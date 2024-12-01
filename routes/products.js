const router = require('express').Router();
const productsController = require('../controllers/products');
const { productValidationRules, validate } = require('../middleware/validate');

const { isAuthenticated } = require('../middleware/authentication');

/* CRUD routes */
router.get('/', productsController.getAll);
router.get('/:id', productsController.getSingle);
router.post('/', isAuthenticated, productValidationRules(), validate, productsController.createProduct);
router.put('/:id', isAuthenticated, productValidationRules(), validate, productsController.updateProduct);
router.delete('/:id', isAuthenticated, productsController.deleteProduct);

module.exports = router;