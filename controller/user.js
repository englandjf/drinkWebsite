var express = require('express');
var router  = express.Router();
var db   = require('../models/db');


/* View all users in a <table> */
router.get('/all', function (req, res) {
    db.GetAll(function (err, result) {
            if (err) throw err;
            res.render('displayUserTable.ejs', {rs: result});
        }
    );
});

/* Create a User */

// Create User Form
router.get('/create', function(req, res){
    res.render('simpleform.ejs', {action: '/user/create'});
});

// Save User to the Database
router.post('/create', function (req, res) {
    db.Insert( req.body, function (err, result) {
            if (err) throw err;

            if(result.UserID != 'undefined') {
                var placeHolderValues = {
                    email: req.body.email,
                    password: req.body.password
                };
                res.render('displayUserInfo.ejs', placeHolderValues);
            }
            else {
                res.send('User was not inserted.');
            }
        }
    );
});

//Mine

//Home page
/*
router.get('/', function (req, res) {
    res.render('index.ejs',blah);
    //res.send('Implement this as part of lab 19');
});
*/

//See All
router.get('/seeAll',function(req,res){
    db.seeAll(function(err,result){
	if(err) throw err;
	res.render('seeAll.ejs',{rs:result});
        }
     );
});

//Search by Kind
router.get('/searchKind',function(req,res){
    res.render('searchKind.ejs',{action: 'user/searchKind'});
});

router.post('/searchKind',function(req,res){
    console.log(req.body);
    db.getByType(req.body, function(err, result){
	if(err){
	    throw err
	}
	else{
	    res.render('seeAll.ejs',{rs:result});
	}
    }
  ); 
});
    

//Search by Ingredient
router.get('/searchIng',function(req,res){
    res.render('searchIng.ejs',{action: 'user/searchIng'});
});

router.post('/searchIng',function(req,res){
    console.log(req.body);
    db.getByIng(req.body, function(err, result){
        if(err){
            throw err
        }
        else{
            res.render('seeAll.ejs',{rs:result});
        }
    }
  );
});


//Add Drink
router.get('/addDrink',function(req,res){
    res.render('addDrink.ejs',{action :'user/addDrink'});
});

/*
router.post('/addDrink',function(req,res){
    console.log(req.body);
    console.log(req.body.ingredient[0]);
    res.send('drink added');
});
*/

// Save Drink to the Database
router.post('/addDrink', function (req, res) {
    //Drink table
    var stage1 = false;
    var stage2 = false;
    var stage3 = false;
    var stage4 = false;
    db.insertDrink( req.body, function (err, result) {
            if (err){ 
		throw err;
		 res.send('An error has occured');
		stage1 = false;
	    }
            else if(result.drinkName != 'undefined') {
               stage1 = true;
            }
            else {
		stage1 = false;
                res.send('Drink was not inserted.');
            }
        }
    );
    //Main Type table
    var mT;
    db.insertMain( req.body, function (err, result) {
            if (err){ 
		throw err;
                 res.send('An error has occured');
		stage2 = false;
                }
            else if(result.mainType != 'undefined') {
                stage2 = true;
            }
            else {
		stage2 = false;
                res.send('Drink was not inserted.');
            }
        }
    );
    //Ingredients
    db.insertIng( req.body, function (err, result) {
            if (err){ 
		throw err;
                 res.send('An error has occured');
		stage3 = false;
                }
            else if(result.ingredient != 'undefined') {
                stage3 = true;
            }
            else {
		stage3 = false;
                res.send('Drink was not inserted.');
            }
        }
    );
    //Steps
    db.insertSteps( req.body, function (err, result) {
            if (err){ 
		throw err;
                 res.send('An error has occured');
		stage4 = false;
                }
            else if(result.step != 'undefined') {
                stage4 = true;
            }
            else {
		stage4 = false;
                res.send('Drink was not inserted.');
            }
        }
    );
    var variables = {
	drinkName: req.body.drinkName,
	glassType: req.body.glassType,
	ice:  req.body.ice,
	mainType: req.body.mainType,
	ingredient: req.body.ingredient,
	step: req.body.step
    };
	
   // alert("Sucessfully Added Drink");
    res.render('displayDrinkInfo',variables);


    
});


//About
router.get('/about',function(req,res){
    res.render('about.ejs',{action: 'user/about'});
});

//More info
router.get('/moreInfo',function(req,res){
    console.log(req.query);
    db.moreInfo(function(err,result){
	if(err) throw err;
	res.render('displayDI2.ejs', {rs:result});
    }
    );
    //res.send('yup');
});








module.exports = router;

