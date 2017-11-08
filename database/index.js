const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost' || process.env.INVENTORY_HOST,
  user: 'root' || process.env.INVENTORY_USER,
  password: '' || process.env.INVENTORY_PASSWORD,
  database: 'inventory_database' || process.env.INVENTORY_DATABASE,
});

const insertListings = (listings, callback) => {
  let searchInventoryMessage;
  let hostsId;
  let destinationsId;
  let neighborhoodsId;
  connection.query(`SELECT id from destinations 
  WHERE destinations.destination_name = '${listings.destinations_name}'`, (err, results, fields) => {
    if (err) {
      callback(err, null);
    } else {
      destinationsId = results;
      connection.query(`SELECT id from neighborhoods 
      WHERE neighborhoods.neighborhood_name = '${listings.neighborhoods_name}'`, (err, results, fields) => {
        if (err) {
          callback(err, null);
        } else {
          neighborhoodsId = results;
          connection.query(`SELECT id from hosts 
          WHERE hosts.host_name = '${listings.host_name}'`, (err, results, fields) => {
            if (err) {
              callback(err, null);
            } else {
              hostsId = results;
              connection.query('INSERT into listings (listing_name, rating, rating_count, room_type, hosts_id, destinations_id, neighborhoods_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [listings.listing_name, listings.rating, listings.number_of_ratings, listings.room_type, `${hostsId[0].id}`, `${destinationsId[0].id}`, `${neighborhoodsId[0].id}`], (err, results, fields) => {
                if (err) {
                  callback(err, null);
                } else {
                  searchInventoryMessage = {
                    listings_id: results.insertId,
                    listingName: listings.listing_name,
                    hostName: listings.host_name,
                    market: listings.destinations_name,
                    neighbourhood: listings.neighborhoods_name,
                    roomType: listings.room_type,
                    averageRating: listings.rating,
                    numberOfRatings: listings.number_of_ratings,
                  };
                  callback(null, searchInventoryMessage);
                }
              });
            }
          });
        }
      });
    }
  });
};

const insertAvailability = (availability, callback) => {
  let searchAddMessage;
  let availabilityInsert;
  const count = availability.date.length;
  for (let i = 0; i < count; i += 1) {
    if (i === count - 1) {
      availabilityInsert += `('${availability.date[i]}', ${availability.price[i]}, ${availability.is_available}, ${availability.listings_id}),`;
      availabilityInsert = availabilityInsert.substring(0, availabilityInsert.length - 1);
      availabilityInsert = availabilityInsert.substring(9, availabilityInsert.length);
    } else {
      availabilityInsert += `('${availability.date[i]}', ${availability.price[i]}, ${availability.is_available}, ${availability.listings_id}),`;
    }
  }
  connection.query(`INSERT INTO availability (availability_date, price, is_available, listings_id) VALUES ${availabilityInsert}`, (err, results, fields) => {
    if (err) {
      callback(err, null);
    } else {
      searchAddMessage = {
        updateType: 'ADD',
        listingId: availability.listings_id,
        date: availability.date,
        price: availability.price,
      };
      callback(null, searchAddMessage);
    }
  });
};

const updateAvailability = (availability, callback) => {
  let recommendationsMessage;
  let searchUpdateMessage;
  let listingsResults;
  let availabilityResults;
  let destinationResults;
  let dateQuery = '(';
  let listingsInsert;
  const nights = [];
  const prices = [];
  const count = availability.date.length;
  for (let i = 0; i < count; i += 1) {
    if (i === count - 1) {
      dateQuery += `'${availability.date[i]}',`;
      dateQuery = dateQuery.substring(0, dateQuery.length - 1);
      dateQuery += ')';
    } else {
      dateQuery += `'${availability.date[i]}',`;
    }
  }
  connection.query(`SELECT * from availability 
  INNER JOIN listings ON listings.id = ${availability.listings_id} 
  WHERE availability.availability_date IN ${dateQuery} 
  ORDER BY availability.id DESC LIMIT ${count}`, (err, results, fields) => {
    if (err) {
      callback(err, null);
    } else {
      listingsResults = results.reverse();
      for (let j = 0; j < count; j += 1) {
        if (j === count - 1) {
          listingsInsert += `('${availability.date[j]}', ${listingsResults[j].price}, ${availability.is_available}, ${availability.listings_id}),`;
          listingsInsert = listingsInsert.substring(0, listingsInsert.length - 1);
          listingsInsert = listingsInsert.substring(9, listingsInsert.length);
        } else {
          listingsInsert += `('${availability.date[j]}', ${listingsResults[j].price}, ${availability.is_available}, ${availability.listings_id}),`;
        }
      }
      connection.query(`INSERT INTO availability (availability_date, price, is_available, listings_id) VALUES ${listingsInsert}`, (err, results, fields) => {
        availabilityResults = results;
        if (err) {
          callback(err, null);
        } else {
          availabilityResults = results;
          connection.query(`SELECT neighborhoods.neighborhood_name, destinations.destination_name from neighborhoods 
            INNER JOIN destinations ON destinations.id = neighborhoods.destinations_id 
            WHERE neighborhoods.id = ${listingsResults[0].neighborhoods_id}`, (err, results, fields) => {
            if (err) {
              callback(err, null);
            } else {
              destinationResults = results;
              for (let k = 0; k < count; k += 1) {
                nights.push({ date: availability.date[k], price: listingsResults[k].price });
                prices.push(listingsResults[k].price);
              }
              recommendationsMessage = {
                listingId: listingsResults[0].id,
                userId: availability.user_id,
                searchId: availability.search_id,
                hostId: listingsResults[0].hosts_id,
                market: destinationResults[0].destination_name,
                neighbourhood: destinationResults[0].neighborhood_name,
                roomType: listingsResults[0].room_type,
                nightlyPrices: nights,
                averageRating: listingsResults[0].rating,
              };
              searchUpdateMessage = {
                updateType: 'REMOVE',
                listingId: listingsResults[0].id,
                date: availability.date,
                price: prices,
              };
              callback(null, [recommendationsMessage, searchUpdateMessage]);
            }
          });
        }
      });
    }
  });
};


module.exports.insertListings = insertListings;
module.exports.insertAvailability = insertAvailability;
module.exports.updateAvailability = updateAvailability;
