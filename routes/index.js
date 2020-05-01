var express = require('express');
var router = express.Router();
const apiRouter = require('./api/v1/index');

/* GET home page. */
router.use('/api/', apiRouter);
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
