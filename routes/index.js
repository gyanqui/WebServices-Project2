const passport = require('passport');
const router = require('express').Router();


router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.use('/', require('./swagger'));
router.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

router.use('/products', require('./products'));
router.use('/sellers', require('./sellers'));

module.exports = router;