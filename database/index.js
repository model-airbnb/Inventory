const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'inventory_database',
});

const insertListings = (listings, count, callback) => {
  console.log(count, listings.neighborhoods_name);
  connection.query(`SELECT id from destinations WHERE destinations.destination_name = '${listings.destinations_name}'`, (err, destinationsId, fields) => {
    if (err) {
      callback(err, null);
    } else {
      connection.query(`SELECT id from neighborhoods WHERE neighborhoods.neighborhood_name = '${listings.neighborhoods_name}'`, (err, neighborhoodsId, fields) => {
        if (err) {
          callback(err, null);
        } else {
          connection.query(`SELECT id from hosts WHERE hosts.host_name = '${listings.host_name}'`, (err, hostsId, fields) => {
            if (err) {
              callback(err, null);
            } else {
              console.log(destinationsId, neighborhoodsId, hostsId);
              connection.query('INSERT into listings (listing_name, rating, rating_count, room_type, hosts_id, destinations_id, neighborhoods_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [listings.listing_name, listings.rating, listings.number_of_ratings, listings.room_type, `${hostsId[0]['id']}`, `${destinationsId[0]['id']}`, `${neighborhoodsId[0]['id']}`], (err, results, fields) => {
                if (err) {
                  callback(err, null);
                } else {
                  console.log(listings.room_type);
                  callback(null, results);
                }
              });
            }
          });
        }
      });
    }
  });
};

const insertAvailability = (availability, count, callback) => {
  console.log(availability.price);
  connection.query('INSERT INTO availability (availability_date, price, is_available, listings_id) VALUES (?, ?, ?, ?)', [availability.date, availability.price, availability.is_available, availability.listings_id], function (err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      console.log(availability.listings_id);
      callback(null, results);
    }
  });
};

const updateAvailability = (availability, count, callback) => {
  console.log(availability);
  connection.query('INSERT INTO availability (availability_date, price, is_available, listings_id) VALUES (?, ?, ?, ?)', [availability.date, availability.price, availability.is_available, availability.listings_id], function (err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      console.log(availability.listings_id);
      callback(null, results);
    }
  });
};

module.exports.insertListings = insertListings;
module.exports.insertAvailability = insertAvailability;
module.exports.updateAvailability = updateAvailability;
