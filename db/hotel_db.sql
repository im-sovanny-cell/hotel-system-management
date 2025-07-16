--CREATE DATABASE hotel_db;


CREATE TABLE guests (
    guest_id INT IDENTITY(1,1) PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(20) NULL
);

CREATE TABLE rooms (
    room_id INT IDENTITY(1,1) PRIMARY KEY,
    room_number VARCHAR(10) NOT NULL UNIQUE,
    type VARCHAR(50) NOT NULL, 
    price_per_night DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Available'
);

CREATE TABLE bookings (
    booking_id INT IDENTITY(1,1) PRIMARY KEY,
    guest_id INT NOT NULL,
    room_id INT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Confirmed',
    
    FOREIGN KEY (guest_id) REFERENCES guests(guest_id),
    FOREIGN KEY (room_id) REFERENCES rooms(room_id)
);

INSERT INTO guests (first_name, last_name, email, phone_number) VALUES
('Im', 'Sovanny', 'im.sovanny@gmail.com', '012345678'),
('Kong', 'Naraksovann', 'kong.naraksovann', '098765432');


INSERT INTO rooms (room_number, type, price_per_night, status) VALUES
('101', 'Single', 85.00, 'Available'),
('102', 'Double', 125.00, 'Occupied'),
('201', 'Suite', 250.00, 'Available');