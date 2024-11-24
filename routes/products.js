const router = require('express').Router();
const productsController = require('../controllers/products');
const { productValidationRules, validate } = require('../middleware/validate');

/* CRUD routes */
router.get('/', productsController.getAll);
router.get('/:id', productsController.getSingle);
router.post('/', productValidationRules(), validate, productsController.createProduct);
router.put('/:id', productValidationRules(), validate, productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;