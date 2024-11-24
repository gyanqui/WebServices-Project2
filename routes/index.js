const router = require('express').Router();

router.use('/', require('./swagger'));
router.get('/', (req, res) => { res.send('Hello world');});
router.use('/products', require('./products'));

module.exports = router;