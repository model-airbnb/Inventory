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
  listing_name VARCHAR(25) NOT NULL,
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
  PRIMARY KEY (id)
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



