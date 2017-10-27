const listingInfo = ['Beautiful', 'Nice', 'Cozy', 'Spacious', 'Luxurious', 'Quiet', 'Peaceful'];
const hosts = ['Ryan Akiyama', 'Tiffany Pham', 'Tyler Truong', 'Christine Wong'];
const roomTypes = ['shared room', 'private', 'entire home'];
const neighborhoods = [
  'Financial District',
  'Glen Park',
  'Golden Gate Park',
  'Haight Ashbury',
  'Inner Richmond',
  'Inner Sunset',
  'Outer Richmond',
  'Outer Sunset',
  'Presidio',
];

const listingsGenerator = () => {
  const listings = [];
  for (let i = 0; i < 50000; i++) {
    const hostName = hosts[Math.floor(Math.random() * hosts.length)];
    const neighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
    const roomType = roomTypes[Math.floor(Math.random() * roomTypes.length)];
    const listingName = `${listingInfo[Math.floor(Math.random() * listingInfo.length)]} ${roomType} in ${neighborhood}`;
    const listingRating = Math.floor(Math.random() * 101);
    const numberOfRatings = Math.floor(Math.random() * 101);
    listings[i] = {
      listing_name: listingName,
      host_name: hostName,
      destinations_name: 'San Francisco',
      neighborhoods_name: neighborhood,
      room_type: roomType,
      rating: listingRating,
      number_of_ratings: numberOfRatings,
    };
  }
  return listings;
};

//availble dates for existings listings are added
const availabilityGenerator = () => {
  const availability = [];
  for (let i = 0; i < 50000; i++) {
    availability[i] = {
      listings_id: Math.floor(Math.random() * 500000),
      date: `2017-${Math.floor(Math.random() * 3) + 10}-${Math.floor(Math.random() * 30) + 1}`,
      price: Math.floor(Math.random() * 251) + 250,
      is_available: 1,
    }; 
  }
  return availability;
};

//availble dates for existings listings are updated, data simulated from user-behavior service
//listing with correct date must already be in the database to not throw an error
const availabilityUpdateGenerator = () => {
  const availability = [];
  for (let i = 0; i < 1; i++) {
    availability[i] = {
      listings_id: Math.floor(Math.random() * 500000),
      date: `2017-${Math.floor(Math.random() * 3) + 10}-${Math.floor(Math.random() * 30) + 1}`,
      is_available: 0,
    };
  }
  return availability;
};

module.exports.listingsGenerator = listingsGenerator;
module.exports.availabilityGenerator = availabilityGenerator;
module.exports.availabilityUpdateGenerator = availabilityUpdateGenerator;
