CREATE DATABASE IF NOT EXISTS top50bestbarscanada_db;

USE top50bestbarscanada_db;

CREATE TABLE Provinces (
    id INT AUTO_INCREMENT PRIMARY KEY,
    province_name VARCHAR(255) NOT NULL
);

CREATE TABLE Bars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bar_name VARCHAR(255) NOT NULL,
    patio BOOLEAN NOT NULL,
    website VARCHAR(255),
    address VARCHAR(255) NOT NULL,
    province_id INT NOT NULL,
    description TEXT,
    FOREIGN KEY (province_id) REFERENCES Provinces(id)
);

CREATE TABLE HistoricalRanks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bar_id INT NOT NULL,
    year YEAR NOT NULL,
    rank_position INT NOT NULL,
    FOREIGN KEY (bar_id) REFERENCES Bars(id)
);