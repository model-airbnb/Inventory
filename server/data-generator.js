const listingInfo = ["Beautiful", "Nice", "Cozy", "Spacious", "Luxurious", "Quiet", "Peaceful"];
const hosts = ["Ryan Akiyama", "Tiffany Pham", "Tyler Truong", "Christine Wong"];
const roomTypes = ["shared room", "private", "entire home"];
const neighborhoods = [ 
                        "Financial District", 
                        "Glen Park", 
                        "Golden Gate Park", 
                        "Haight Ashbury", 
                        "Inner Richmond", 
                        "Inner Sunset", 
                        "Outer Richmond", 
                        "Outer Sunset", 
                        "Presidio"
                      ];

const listingsGenerator = function() {
  const listings = [];
  for (var i = 0; i < 50000; i++) {
    let hostName = hosts[Math.floor(Math.random() * hosts.length)];
    let neighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
    let roomType = roomTypes[Math.floor(Math.random() * roomTypes.length)];
    let listingName = `${listingInfo[Math.floor(Math.random() * listingInfo.length)]} ${roomType} in ${neighborhood}`;
    let listingRating = Math.floor(Math.random() * 101);
    let numberOfRatings = Math.floor(Math.random() * 101);
    let listingDate = `2017-${Math.floor(Math.random() * 3) + 10}-${Math.floor(Math.random() * 31) + 1}`;
    let listingPrice = Math.floor(Math.random() * 251) + 250;
    listings[i] = { 
                    listing_name: listingName,
                    host_name: hostName,
                    destinations_name: 'San Francisco',
                    neighborhoods_name: neighborhood,
                    room_type: roomType,
                    rating: listingRating,
                    number_of_ratings: numberOfRatings
                  };  
  }
  return listings;
}

const availabilityGenerator = function() {
  const availability = [];
  for (var i = 0; i < 50000; i++) {
    availability[i] = { 
                        listings_id: Math.floor(Math.random() * 500000),
                        date: `2017-${Math.floor(Math.random() * 3) + 10}-${Math.floor(Math.random() * 30) + 1}`,
                        price: Math.floor(Math.random() * 251) + 250,
                        is_available: 1
                      };  
  }
  return availability;
}

module.exports.listingsGenerator = listingsGenerator
module.exports.availabilityGenerator = availabilityGenerator;