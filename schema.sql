DROP DATABASE IF EXISTS inventory_database;

CREATE DATABASE inventory_database;

USE inventory_database;

CREATE TABLE destinations (
  id int NOT NULL AUTO_INCREMENT,
  destination_name char(25) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE neighborhoods (
  id INT NOT NULL AUTO_INCREMENT,
  neighborhood_name char(25) NOT NULL,
  destinations_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(destinations_id) REFERENCES destinations(id)
);

CREATE TABLE hosts (
  id INT NOT NULL AUTO_INCREMENT,
  host_name char(25) NOT NULL,
  is_super_host tinyint(1),
  PRIMARY KEY (id)
);

CREATE TABLE listings (
  id INT NOT NULL AUTO_INCREMENT,
  listing_name CHAR(25) NOT NULL,
  rating INT NOT NULL,
  rating_count INT NOT NULL,
  room_type CHAR(15) NOT NULL,
  hosts_id INT NOT NULL,
  destinations_id INT NOT NULL,
  neighborhoods_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(destinations_id) REFERENCES destinations(id),
  FOREIGN KEY(neighborhoods_id) REFERENCES neighborhoods(id),
  FOREIGN KEY(hosts_id) REFERENCES hosts(id)
);

CREATE TABLE amenities (
  id int NOT NULL AUTO_INCREMENT,
  amenities_name char(25) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE listings_amenities (
  id int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  listings_id INT NOT NULL,
  amenities_id INT NOT NULL,
  FOREIGN KEY(listings_id) REFERENCES listings(id),
  FOREIGN KEY(amenities_id) REFERENCES amenities(id)
);

CREATE TABLE availability (
  id int NOT NULL AUTO_INCREMENT,
  availability_date date,
  price int,
  is_available tinyint(1),
  listings_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(listings_id) REFERENCES listings(id)
);

INSERT INTO destinations (destination_name) VALUES ("San Francisco");
INSERT INTO neighborhoods (neighborhood_name, destinations_id) VALUES ("Sunset", 1);
INSERT INTO hosts (host_name, is_super_host) VALUES ("Ryan Akiyama", 1);
INSERT INTO listings (listing_name, rating, rating_count, room_type, hosts_id, destinations_id, neighborhoods_id) VALUES ("Cool Place", 4.5, 100, "shared room", 1, 1, 1);
INSERT INTO listings (listing_name, rating, rating_count, room_type, hosts_id, destinations_id, neighborhoods_id) VALUES ("l Pace", 4.5, 100, "shared room", 1, 1, 1);
INSERT INTO listings (listing_name, rating, rating_count, room_type, hosts_id, destinations_id, neighborhoods_id) VALUES ("Cool Place", 4.5, 100, "shared room", 1, 1, 1);
INSERT INTO listings (listing_name, rating, rating_count, room_type, hosts_id, destinations_id, neighborhoods_id) VALUES ("Cool Pce", 4.5, 100, "shared room", 1, 1, 1);
INSERT INTO listings (listing_name, rating, rating_count, room_type, hosts_id, destinations_id, neighborhoods_id) VALUES ("Col Plae", 4.5, 100, "shared room", 1, 1, 1);
INSERT INTO listings (listing_name, rating, rating_count, room_type, hosts_id, destinations_id, neighborhoods_id) VALUES ("ol Place", 4.5, 100, "shared room", 1, 1, 1);
INSERT INTO listings (listing_name, rating, rating_count, room_type, hosts_id, destinations_id, neighborhoods_id) VALUES ("Coo Place", 4.5, 100, "shared room", 1, 1, 1);
INSERT INTO listings (listing_name, rating, rating_count, room_type, hosts_id, destinations_id, neighborhoods_id) VALUES ("Cooace", 4.5, 100, "shared room", 1, 1, 1);
INSERT INTO listings (listing_name, rating, rating_count, room_type, hosts_id, destinations_id, neighborhoods_id) VALUES ("Coce", 4.5, 100, "shared room", 1, 1, 1);
INSERT INTO listings (listing_name, rating, rating_count, room_type, hosts_id, destinations_id, neighborhoods_id) VALUES ("Cool Plac", 4.5, 100, "shared room", 1, 1, 1);

