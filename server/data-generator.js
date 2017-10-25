const listingInfo = ["Beautiful", "Nice", "Cozy", "Spacious", "Luxurious", "Quiet", "Peaceful"];
const hosts = ["Ryan Akiyama"];
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
  for (var i = 0; i < 3; i++) {
    let hostName = hosts[Math.floor(Math.random() * hosts.length)];
    let superHost = Math.floor(Math.random() * 2);
    let neighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
    let roomType = roomTypes[Math.floor(Math.random() * roomTypes.length)];
    let houseAmenities = [1, 3, 4, 5];
    let listingName = `${listingInfo[Math.floor(Math.random() * listingInfo.length)]} + " " + ${roomType} + " house in " + ${neighborhood}`;
    let hostRating = Math.floor(Math.random() * 101);
    let numberOfRatings = Math.floor(Math.random() * 101);
    let listingDate = new Date(2017, Math.floor(Math.random() * 3) + 9, Math.floor(Math.random() * 32) + 1);
    let listingPrice = Math.floor(Math.random() * 251) + 250;
    listings[i] = { 
                    listing_name: listingName,
                    host_name: hostName,
                    super_host: superHost,
                    destinations_name: 'San Francisco',
                    neighborhoods_name: neighborhood,
                    room_type: roomType,
                    amenities: houseAmenities,
                    nightly_prices: [
                                      {
                                        date: listingDate,
                                        price: listingPrice
                                      },
                                    ],
                    is_available: 1,
                    rating: hostRating,
                    number_of_ratings: numberOfRatings
                  };  
  }
  return listings;
}

module.exports.listingsGenerator = listingsGenerator;