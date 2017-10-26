DROP DATABASE IF EXISTS inventory_database;

CREATE DATABASE inventory_database;

USE inventory_database;

CREATE TABLE destinations (
  id INT NOT NULL AUTO_INCREMENT,
  destination_name VARCHAR(25) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE neighborhoods (
  id INT NOT NULL AUTO_INCREMENT,
  neighborhood_name VARCHAR(25) NOT NULL,
  destinations_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(destinations_id) REFERENCES destinations(id)
);

CREATE TABLE hosts (
  id INT NOT NULL AUTO_INCREMENT,
  host_name VARCHAR(25) NOT NULL,
  is_super_host TINYINT(1),
  PRIMARY KEY(id)
);

CREATE TABLE listings (
  id INT NOT NULL AUTO_INCREMENT,
  listing_name VARCHAR(50) NOT NULL,
  rating INT,
  rating_count INT,
  room_type VARCHAR(15) NOT NULL,
  hosts_id INT NOT NULL,
  destinations_id INT NOT NULL,
  neighborhoods_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(destinations_id) REFERENCES destinations(id),
  FOREIGN KEY(neighborhoods_id) REFERENCES neighborhoods(id),
  FOREIGN KEY(hosts_id) REFERENCES hosts(id)
);

CREATE TABLE amenities (
  id INT NOT NULL AUTO_INCREMENT,
  amenities_name VARCHAR(25) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE listings_amenities (
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  listings_id INT NOT NULL,
  amenities_id INT NOT NULL,
  FOREIGN KEY(listings_id) REFERENCES listings(id),
  FOREIGN KEY(amenities_id) REFERENCES amenities(id)
);

CREATE TABLE availability (
  id INT NOT NULL AUTO_INCREMENT,
  availability_date DATE,
  price INT,
  is_available TINYINT(1),
  listings_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(listings_id) REFERENCES listings(id)
);

INSERT INTO destinations (destination_name) VALUES ("San Francisco");
INSERT INTO neighborhoods (neighborhood_name, destinations_id) VALUES ("Glen Park", 1);
INSERT INTO neighborhoods (neighborhood_name, destinations_id) VALUES ("Golden Gate Park", 1);
INSERT INTO neighborhoods (neighborhood_name, destinations_id) VALUES ("Haight Ashbury", 1);
INSERT INTO neighborhoods (neighborhood_name, destinations_id) VALUES ("Inner Richmond", 1);
INSERT INTO neighborhoods (neighborhood_name, destinations_id) VALUES ("Inner Sunset", 1);
INSERT INTO neighborhoods (neighborhood_name, destinations_id) VALUES ("Outer Richmond", 1);
INSERT INTO neighborhoods (neighborhood_name, destinations_id) VALUES ("Outer Sunset", 1);
INSERT INTO neighborhoods (neighborhood_name, destinations_id) VALUES ("Presidio", 1);
INSERT INTO neighborhoods (neighborhood_name, destinations_id) VALUES ("Financial District", 1);
INSERT INTO hosts (host_name, is_super_host) VALUES ("Ryan Akiyama", 1);
INSERT INTO hosts (host_name, is_super_host) VALUES ("Tiffany Pham", 1);
INSERT INTO hosts (host_name, is_super_host) VALUES ("Tyler Truong", 1);
INSERT INTO hosts (host_name, is_super_host) VALUES ("Christine Wong", 1);