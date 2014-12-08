var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});


// Return the text Hello, World!.
router.get('/hello', function(req, res){
    res.send('Hello, World!');
});


module.exports = router;

