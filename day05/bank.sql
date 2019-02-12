DROP DATABASE IF EXISTS bank;
CREATE DATABASE bank;
USE bank;
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
  phone VARCHAR(20) NULL,
  mobile VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  address_id INT NOT NULL,
  entry_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  leaving_date DATETIME NULL,
  PRIMARY KEY (customer_id),
  CONSTRAINT fk_customer_address FOREIGN KEY (address_id) REFERENCES Address(address_id)
);
CREATE TABLE Employee (
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE NULL,
  phone VARCHAR(20) NULL,
  mobile VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  address_id INT NOT NULL,
  entry_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  leaving_date DATETIME NULL,
  PRIMARY KEY (employee_id),
  CONSTRAINT fk_employee_address FOREIGN KEY (address_id) REFERENCES Address(address_id)
);
CREATE TABLE Bank (
  bank_id INT NOT NULL AUTO_INCREMENT,
  address_id INT NOT NULL,
  president_id INT NOT NULL,
  PRIMARY KEY (bank_id),
  CONSTRAINT fk_bank_address FOREIGN KEY (address_id) REFERENCES Address(address_id),
  CONSTRAINT fk_bank_president FOREIGN KEY (president_id) REFERENCES Employee (employee_id)
);
CREATE TABLE Branch (
  branch_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  address_id INT NOT NULL,
  bank_id INT NOT NULL,
  PRIMARY KEY (branch_id),
  CONSTRAINT fk_branch_address FOREIGN KEY (address_id) REFERENCES Address(address_id),
  CONSTRAINT fk_branch_bank FOREIGN KEY (bank_id) REFERENCES Bank (bank_id)
);
CREATE TABLE Branch_Employee (
  branch_id INT NOT NULL,
  employee_id INT NOT NULL,
  job_title VARCHAR(50) NOT NULL,
  salary DECIMAL(13, 4),
  PRIMARY KEY (branch_id, employee_id),
  CONSTRAINT fk_branch_employee_branch FOREIGN KEY (branch_id) REFERENCES Branch(branch_id),
  CONSTRAINT fk_branch_employee_employee FOREIGN KEY (employee_id) REFERENCES Employee (employee_id)
);
CREATE TABLE Account_Type (
  account_type_id INT NOT NULL AUTO_INCREMENT,
  description VARCHAR(100) NOT NULL,
  PRIMARY KEY (account_type_id)
);
CREATE TABLE Account (
  account_id INT NOT NULL AUTO_INCREMENT,
  amount DECIMAL(13, 4) NOT NULL,
  account_type_id INT NOT NULL,
  branch_id INT NOT NULL,
  customer_id INT NOT NULL,
  PRIMARY KEY (account_id),
  CONSTRAINT fk_account_type FOREIGN KEY (account_type_id) REFERENCES Account_Type(account_type_id),
  CONSTRAINT fk_account_branch FOREIGN KEY (branch_id) REFERENCES Branch(branch_id),
  CONSTRAINT fk_account_customer FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);
CREATE TABLE Transaction (
  transaction_id VARCHAR(100) NOT NULL,
  sender INT NULL,
  receiver INT NOT NULL,
  amount DECIMAL(13, 4),
  transaction_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  branch_id INT NOT NULL,
  PRIMARY KEY (transaction_id),
  CONSTRAINT fk_transaction_sender FOREIGN KEY (sender) REFERENCES Account(account_id),
  CONSTRAINT fk_transaction_receiver FOREIGN KEY (receiver) REFERENCES Account(account_id),
  CONSTRAINT fk_transaction_branch FOREIGN KEY (branch_id) REFERENCES Branch(branch_id)
);
CREATE TABLE Commission_Type (
  commission_type_id INT NOT NULL AUTO_INCREMENT,
  description VARCHAR(100) NOT NULL,
  PRIMARY KEY (commission_type_id)
);
CREATE TABLE Bank_Commission (
  bank_commission_id INT NOT NULL AUTO_INCREMENT,
  amount DECIMAL(13, 4) NOT NULL,
  account_type_id INT NOT NULL,
  commission_type_id INT NOT NULL,
  PRIMARY KEY (bank_commission_id),
  CONSTRAINT fk_bank_commission_account_type FOREIGN KEY (account_type_id) REFERENCES Account_Type(account_type_id),
  CONSTRAINT fk_bank_commission_commission_type FOREIGN KEY (commission_type_id) REFERENCES Commission_Type(commission_type_id)
);