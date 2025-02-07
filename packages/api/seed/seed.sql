
-- Insert data into UserTable
INSERT INTO User (id, email, first_name, last_name, address, zip_code, phone, role) VALUES
('user1', 'user1@example.com', 'John', 'Doe', '123 Main St', 12345, 1234567890, 'customer'),
('user2', 'user2@example.com', 'Jane', 'Smith', '456 Oak Ave', 67890, 9876543210, 'admin'),
('user3', 'user3@example.com', 'Peter', 'Jones', '789 Pine Ln', 34567, 2345678901, 'customer'),
('user4', 'user4@example.com', 'Alice', 'Brown', '101 Elm Rd', 89012, 3456789012, 'customer');

-- Insert data into CategoryTable
INSERT INTO Category (id, name, description) VALUES
('cat1', 'T-Shirts', 'Cool T-Shirts'),
('cat2', 'Hoodies', 'Warm Hoodies'),
('cat3', 'Hats', 'Stylish Hats');

-- Insert data into ProductTable
INSERT INTO Product (id, name, description, price, category, image_url, stock_quantity, is_active) VALUES
('prod1', 'Rasta T-Shirt', 'A cool t-shirt with rasta colors', 25.00, 'cat1', 'rasta_tshirt.jpg', 50, 1),
('prod2', 'Rasta Hoodie', 'A warm hoodie with rasta colors', 50.00, 'cat2', 'rasta_hoodie.jpg', 25, 1),
('prod3', 'Rasta Hat', 'A stylish hat with rasta colors', 20.00, 'cat3', 'rasta_hat.jpg', 30, 1),
('prod4', 'Bob Marley T-Shirt', 'A t-shirt featuring Bob Marley', 30.00, 'cat1', 'bob_marley_tshirt.jpg', 40, 1);

-- Insert data into PaymentTable
INSERT INTO Payment (id, user_id, amount, currency, status, order_id, description) VALUES
('pay1', 'user1', 75.00, 'USD', 'COMPLETED', 'order1', 'Order for Rasta T-Shirt and Hoodie'),
('pay2', 'user2', 20.00, 'USD', 'PENDING', 'order2', 'Order for Rasta Hat'),
('pay3', 'user3', 55.00, 'USD', 'COMPLETED', 'order3', 'Order for Rasta T-Shirt and Bob Marley T-Shirt');

-- Insert data into AuthMethodTable
INSERT INTO AuthMethod (id, user_id, hashed_password, hash_method) VALUES
('auth1', 'user1', 'hashed_password_1', 'bcrypt'),
('auth2', 'user2', 'hashed_password_2', 'bcrypt'),
('auth3', 'user3', 'hashed_password_3', 'bcrypt'),
('auth4', 'user4', 'hashed_password_4', 'bcrypt');

-- Insert data into SessionTable
INSERT INTO Session (id, user_id, expires_at) VALUES
('session1', 'user1', strftime('%s', 'now', '+1 day')),
('session2', 'user2', strftime('%s', 'now', '+1 day')),
('session3', 'user3', strftime('%s', 'now', '+1 day')),
('session4', 'user4', strftime('%s', 'now', '+1 day'));

-- Insert data into RefundTable
INSERT INTO Refund (id, payment_id, amount, status) VALUES
('refund1', 'pay1', 10.00, 'PENDING'),
('refund2', 'pay2', 5.00, 'COMPLETED');

-- Insert data into ShipmentTrackingTable
INSERT INTO ShipmentTracking (id, order_id, shipment_id, tracking_url, status) VALUES
('ship1', 'order1', 'shipment123', 'example.com/tracking', 'PROCESSING'),
('ship2', 'order2', 'shipment456', 'example.com/tracking2', 'SHIPPED');

-- Insert data into CarTable
INSERT INTO Car (id, make, model, year, color, price, mileage, fuelType) VALUES
('car1', 'Toyota', 'Corolla', 2020, 'Red', 20000.00, 50000, 'Gasoline'),
('car2', 'Honda', 'Civic', 2021, 'Blue', 22000.00, 40000, 'Gasoline');

-- Insert data into AccountabilityTable
INSERT INTO Accountability (id, payment_id, user_id, action) VALUES
('acc1', 'pay1', 'user1', 'CREATE'),
('acc2', 'pay2', 'user2', 'CREATE');
