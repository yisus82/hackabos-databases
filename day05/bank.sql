DROP DATABASE IF EXISTS bank;
CREATE DATABASE bank;
CREATE TABLE Country (
  country_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  UNIQUE (name),
  PRIMARY KEY (country_id)
);
CREATE TABLE Province (
  province_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  country_id INT NOT NULL,
  PRIMARY KEY (province_id),
  CONSTRAINT fk_province_country FOREIGN KEY (country_id) REFERENCES Country(country_id)
);
CREATE TABLE City (
  city_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  province_id INT NOT NULL,
  PRIMARY KEY (city_id),
  CONSTRAINT fk_city_province FOREIGN KEY (province_id) REFERENCES Province(province_id)
);
CREATE TABLE Address (
  address_id INT NOT NULL AUTO_INCREMENT,
  street_name VARCHAR(100) NOT NULL,
  street_number VARCHAR(10) NULL,
  street_floor INT NULL,
  zip_code VARCHAR(10) NULL,
  city_id INT NOT NULL,
  PRIMARY KEY (address_id),
  CONSTRAINT fk_address_city FOREIGN KEY (city_id) REFERENCES City(city_id)
);
CREATE TABLE Customer (
  customer_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE NULL,
  address_id INT NOT NULL,
  entry_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  leaving_date DATETIME NULL,
  PRIMARY KEY (customer_id),
  CONSTRAINT fk_customer_address FOREIGN KEY (address_id) REFERENCES Address(address_id)
);