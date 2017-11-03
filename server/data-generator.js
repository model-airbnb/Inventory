const listingInfo = ['Beautiful', 'Nice', 'Cozy', 'Spacious', 'Luxurious', 'Quiet', 'Peaceful', 'Big', 'Small', 'Large', 'Stunning', 'Comfy'];
const hosts = ['Ryan Akiyama', 'Tiffany Pham', 'Tyler Truong', 'Christine Wong'];
const roomTypes = ['private room', 'entire home/apt', 'shared room'];
const destinations = ['San Francisco'];
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
  'Presidio Heights',
  'Russian Hill',
  'Seacliff',
  'South of Market',
  'Twin Peaks',
];

//available listings are added
const listingsGenerator = () => {
  const listings = [];
  for (let i = 0; i < 10000; i += 1) {
    const hostName = hosts[Math.floor(Math.random() * hosts.length)];
    const destination = destinations[Math.floor(Math.random() * destinations.length)];
    const neighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
    const roomType = roomTypes[Math.floor(Math.random() * roomTypes.length)];
    const listingName = `${listingInfo[Math.floor(Math.random() * listingInfo.length)]} ${roomType} in ${neighborhood}`;
    const listingRating = Math.floor(Math.random() * 101);
    const numberOfRatings = Math.floor(Math.random() * 101);
    listings[i] = {
      listing_name: listingName,
      host_name: hostName,
      destinations_name: destination,
      neighborhoods_name: neighborhood,
      room_type: roomType,
      rating: listingRating,
      number_of_ratings: numberOfRatings,
    };
  }
  return listings;
};

//available listings are written to a file to import
const listingsGeneratorImport = () => {
  const listings = [];
  for (let i = 0; i < 5000; i += 1) {
    const neighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
    const roomType = roomTypes[Math.floor(Math.random() * roomTypes.length)];
    const listingName = `${listingInfo[Math.floor(Math.random() * listingInfo.length)]} ${roomType} in ${neighborhood}`;
    const listingRating = Math.floor(Math.random() * 101);
    const numberOfRatings = Math.floor(Math.random() * 101);
    const hostsId = Math.ceil(Math.random() * 4);
    const destinationsId = 1;
    const neighborhoodsId = Math.ceil(Math.random() * 9);

    //uncomment below to write listings to a .json file
    // listings[i] = {
    //   listing_name: listingName,
    //   rating: listingRating,
    //   rating_count: numberOfRatings,
    //   room_type: roomType,
    //   hosts_id: Math.ceil(Math.random() * 4),
    //   destinations_id: 1,
    //   neighborhoods_id: Math.ceil(Math.random() * 9),
    // };

    //uncomment below ot write listings to a .csv file
    listings[i] = `'${listingName}',${listingRating},${numberOfRatings},${roomType},${hostsId},${destinationsId},${neighborhoodsId}`;
  }
  return listings;
};

//availble dates for existings listings are added
const availabilityGenerator = () => {
  const availability = [];
  for (let i = 0; i < 10000; i += 1) {
    availability[i] = {
      listings_id: Math.floor(Math.random() * 10000000),
      date: [
        `2017-${Math.floor(Math.random() * 3) + 10}-${Math.floor(Math.random() * 30) + 1}`,
        `2017-${Math.floor(Math.random() * 3) + 10}-${Math.floor(Math.random() * 30) + 1}`,
        `2017-${Math.floor(Math.random() * 3) + 10}-${Math.floor(Math.random() * 30) + 1}`,
      ],
      price: [
        Math.floor(Math.random() * 100) + 300,
        Math.floor(Math.random() * 100) + 300,
        Math.floor(Math.random() * 100) + 300,
      ],
      is_available: 1,
    };
  }
  return availability;
};

//availble dates for existings listings are updated, data simulated from user-behavior service
//listing with correct date must already be in the database to not throw an error
const availabilityUpdateGenerator = () => {
  const availability = [];
  for (let i = 0; i < 10000; i += 1) {
    availability[i] = {
      listings_id: Math.floor(Math.random() * 10000000),
      user_id: Math.floor(Math.random() * 10000000),
      search_id: Math.floor(Math.random() * 10000000),
      date: [
        `2017-${Math.floor(Math.random() * 3) + 10}-${Math.floor(Math.random() * 30) + 1}`,
        `2017-${Math.floor(Math.random() * 3) + 10}-${Math.floor(Math.random() * 30) + 1}`,
        `2017-${Math.floor(Math.random() * 3) + 10}-${Math.floor(Math.random() * 30) + 1}`,
      ],
      is_available: 0,
    };
  }
  return availability;
};

module.exports.listingsGenerator = listingsGenerator;
module.exports.listingsGeneratorImport = listingsGeneratorImport;
module.exports.availabilityGenerator = availabilityGenerator;
module.exports.availabilityUpdateGenerator = availabilityUpdateGenerator;
