var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
  database: 'helpwanted',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);
// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in', req.user);
    var userInfo = {
      username : req.user.username
    };
    res.send(userInfo);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

	

router.get('/bookmark', function (req, res) {
  pool.connect(function (errorConnectingToDB, db, done) {
    if (errorConnectingToDB) {
      console.log('Error connecting to db', errorConnectingToDB);
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT r.*,h.* FROM public."userbookmarked" eb INNER JOIN public.resources r ON r.resourceid = eb.resourceid LEFT JOIN public.hoursofoperation h ON h.resourceid = r.resourceid' ;
      db.query(queryText, function (errorMakingQuery, result) {
        done();
        if (errorMakingQuery) {
          console.log('Error making query', errorMakingQuery, result)
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});


module.exports = router;
