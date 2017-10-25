var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'inventory_database'
});

// var pgp = require('pg-promise')(/*options*/)
// var db = pgp('postgres://root:inventory@localhost:5432/postgres')



const insertListings = function (listings, callback) {
  console.log(listings);
 
};

module.exports.insertListings = insertListings;