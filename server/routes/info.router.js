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

router.get('/', function (req, res) {
  pool.connect(function (errorConnectingToDB, db, done) {
    if (errorConnectingToDB) {
      console.log('Error connecting to db', errorConnectingToDB);
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT r."resourceid" ' +
                             ',r."resourcename" ' +
                             ', r."description" '+
                             ',r."recommendations" '+
                             ',r."imageurl" '+
                             ',r."phone" '+
                             ',r."website" '+
                             ',h."mondayhours" '+
                             ',h."tuesdayhours" '+
                             ',h."wednesdayhours" '+
                             ',h."thursdayhours" '+
                             ',h."fridayhours" '+
                             ',h."saturdayhours" '+
                             ',h."fridayhours" '+
                             ',h."saturdayhours" '+
                             ',h."sundayhours" '+
                             ', a.* '+
                             'FROM public."resources" r '+
                             'LEFT JOIN public."hoursofoperation" h ON h.resourceid = r.resourceid '+
                             'LEFT JOIN public."resourceaddress" ra ON ra."resourceid" = r."resourceid"  '+
                             'LEFT JOIN public."addresses" a ON a."addressid" = ra."addressid" '+
                             'WHERE "isapproved" = TRUE;';
      db.query(queryText, function (errorMakingQuery, result) {
        done();
        if (errorMakingQuery) {
          console.log('Error making query', errorMakingQuery, result)
          res.sendStatus(500);
        } else {
          console.log(result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});

/*
router.get('/:id', function (req, res) {
  var resourceid = req.params.id;
  console.log('RESOURCE ID MAYBE', resourceid)
  pool.connect(function (errorConnectingToDB, db, done) {
    if (errorConnectingToDB) {
      console.log('Error connecting to db', errorConnectingToDB);
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT r."resourceid",r."resourcename", r."description",r."imageurl" ,r."phone",r."website" ,h."mondayhours" ,h."tuesdayhours",h."wednesdayhours",h."thursdayhours",h."fridayhours" ,h."saturdayhours",h."fridayhours",h."saturdayhours",h."sundayhours", a.* FROM public."resources" r LEFT JOIN public."hoursofoperation" h ON h.resourceid = r.resourceid LEFT JOIN public."resourceaddress" ra ON ra."resourceid" = r."resourceid"  LEFT JOIN public."addresses" a ON a."addressid" = ra."addressid"WHERE "isapproved" = TRUE AND r."resourceid" = $1';
      db.query(queryText,[resourceid], function (errorMakingQuery, result) {
        done();
        if (errorMakingQuery) {
          console.log('Error making query', errorMakingQuery, result)
          res.sendStatus(500);
        } else {
          console.log(result.rows, 'RESULT.ROWS ON GET');
          res.send(result.rows);
        }
      });
    }
  });
});*/

router.post('/bookmark', function (req, res) {
  var bookmark = req.body.resourceid;
  var user = req.user.userid;
  pool.connect(function (errorConnectingToDB, db, done) {
    if (errorConnectingToDB) {
      console.log('Error connecting to db', errorConnectingToDB);
      res.sendStatus(500);
    } else {
      var queryText ='INSERT INTO "userbookmarked" ("userid" ' +
                                                  ', "resourceid")' +
                     'VALUES ((SELECT userid FROM public."usermaster" WHERE userid = $1) ' +
                     ',(SELECT resourceid FROM public."resources" WHERE NOT EXISTS (' +
                                                                           'SELECT resourceid ' +
                                                                           'FROM public."userbookmarked" ' +
                                                                           'WHERE resourceid = $2' +
                                                                          ')' +
                                                        'AND resourceid = $2));';
      db.query(queryText, [user, bookmark], function (errorMakingQuery, result) {
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


router.put('/recommend/:id', function (req, res) {
  var recommend = req.params.id;
  var user = req.user.userid;
  console.log('RECOMMMMMEND', recommend);
  pool.connect(function (errorConnectingToDB, db, done) {
    if (errorConnectingToDB) {
      console.log('Error connecting to db', errorConnectingToDB);
      res.sendStatus(500);
    } else {
      var queryText = 'UPDATE "resources" ' +
                      'SET "recommendations" = ("recommendations"+1) ' +
                      'WHERE "resourceid" = $1;';
      db.query(queryText, [recommend], function (errorMakingQuery, result) {
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



  module.exports = router;


