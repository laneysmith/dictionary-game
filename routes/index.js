var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  knex('player').insert(req.body).then(function(){
    res.redirect('/game');
  }).catch(function(error) {
    console.log(error);
    next(error);
  });
});

module.exports = router;
