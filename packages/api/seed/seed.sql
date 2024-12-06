-- Drop tables in reverse order of dependencies to avoid foreign key constraint issues

DROP TABLE IF EXISTS Accountability;
DROP TABLE IF EXISTS Refund;
DROP TABLE IF EXISTS Payment;
DROP TABLE IF EXISTS Session;
DROP TABLE IF EXISTS AuthMethod;
DROP TABLE IF EXISTS Video;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS Car;
DROP TABLE IF EXISTS User;

-- User Table
CREATE TABLE User (
  id TEXT PRIMARY KEY NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  address TEXT,
  zip_code INTEGER,
  phone INTEGER,
  role TEXT DEFAULT 'customer'
);

-- AuthMethod Table
CREATE TABLE AuthMethod (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  hashed_password TEXT,
  hash_method TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  totp_secret TEXT,
  totp_expires INTEGER,
  timeout_until INTEGER,
  timeout_seconds INTEGER,
  FOREIGN KEY (user_id) REFERENCES User(id)
);

-- Session Table
CREATE TABLE Session (
  id TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User(id)
);

-- Category Table
CREATE TABLE Category (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT
);

-- Product Table
CREATE TABLE Product (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price REAL NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  stock_quantity INTEGER NOT NULL,
  is_active INTEGER NOT NULL,
  FOREIGN KEY (category) REFERENCES Category(id)
);

-- Video Table
CREATE TABLE Video (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  url TEXT NOT NULL
);

-- Payment Table
CREATE TABLE Payment (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  amount REAL NOT NULL,
  currency TEXT NOT NULL,
  status TEXT DEFAULT 'PENDING',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  order_id TEXT NOT NULL UNIQUE,
  description TEXT,
  success_url TEXT,
  back_url TEXT,
  notification_url TEXT,
  FOREIGN KEY (user_id) REFERENCES User(id)
);

-- Refund Table
CREATE TABLE Refund (
  id TEXT PRIMARY KEY,
  payment_id TEXT NOT NULL,
  amount REAL NOT NULL,
  status TEXT DEFAULT 'PENDING',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (payment_id) REFERENCES Payment(id)
);

-- Accountability Table
CREATE TABLE Accountability (
  id TEXT PRIMARY KEY,
  payment_id TEXT NOT NULL,
  user_id TEXT,
  action TEXT NOT NULL,
  timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  FOREIGN KEY (payment_id) REFERENCES Payment(id),
  FOREIGN KEY (user_id) REFERENCES User(id)
);

-- Car Table
CREATE TABLE Car (
  id TEXT PRIMARY KEY,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  color TEXT NOT NULL,
  price REAL NOT NULL,
  mileage INTEGER NOT NULL,
  fuelType TEXT NOT NULL,
  transmission TEXT NOT NULL
);
-- Category Table
INSERT INTO Category (id, name, description)
VALUES
  ('1', 'Electronics', 'Devices and gadgets.'),
  ('2', 'Clothing', 'Apparel and accessories.'),
  ('3', 'Books', 'Various books and literature.'),
  ('4', 'Home', 'Furniture and home goods.');

-- User Table
INSERT INTO User (id, email, first_name, last_name, address, zip_code, phone, role)
VALUES
  ('user1', 'user1@example.com', 'John', 'Doe', '123 Main St', 12345, 5551234567, 'customer'),
  ('user2', 'user2@example.com', 'Jane', 'Smith', '456 Elm St', 67890, 5559876543, 'customer'),
  ('user3', 'admin@example.com', 'Admin', 'User', '789 Oak St', 11223, 5551112233, 'admin');

-- AuthMethod Table
INSERT INTO AuthMethod (id, user_id, hashed_password, hash_method, created_at, totp_secret, totp_expires, timeout_until, timeout_seconds)
VALUES
  ('auth1', 'user1', 'hashed_password_1', 'bcrypt', CURRENT_TIMESTAMP, NULL, NULL, NULL, NULL),
  ('auth2', 'user2', 'hashed_password_2', 'bcrypt', CURRENT_TIMESTAMP, NULL, NULL, NULL, NULL),
  ('auth3', 'user3', 'hashed_password_3', 'bcrypt', CURRENT_TIMESTAMP, NULL, NULL, NULL, NULL);

-- Session Table
INSERT INTO Session (id, user_id, expires_at)
VALUES
  ('session1', 'user1', strftime('%s', 'now') + 3600),
  ('session2', 'user2', strftime('%s', 'now') + 3600),
  ('session3', 'user3', strftime('%s', 'now') + 3600);

-- Product Table
INSERT INTO Product (id, name, description, price, category, image_url, stock_quantity, is_active)
VALUES
  ('prod1', 'Smartphone', 'Latest model smartphone.', 699.99, '1', 'http://example.com/smartphone.jpg', 50, 1),
  ('prod2', 'T-Shirt', '100% cotton t-shirt.', 19.99, '2', 'http://example.com/tshirt.jpg', 200, 1),
  ('prod3', 'Novel', 'Bestselling novel.', 14.99, '3', 'http://example.com/novel.jpg', 150, 1),
  ('prod4', 'Sofa', 'Comfortable 3-seater sofa.', 499.99, '4', 'http://example.com/sofa.jpg', 20, 1);

-- Video Table
INSERT INTO Video (id, title, description, url)
VALUES
  ('vid1', 'Product Demo', 'Demo of our latest product.', 'http://example.com/demo.mp4'),
  ('vid2', 'Customer Testimonial', 'Hear from our satisfied customers.', 'http://example.com/testimonial.mp4');

-- Payment Table
INSERT INTO Payment (id, user_id, amount, currency, status, created_at, updated_at, order_id, description, success_url, back_url, notification_url)
VALUES
  ('pay1', 'user1', 100.00, 'USD', 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'order123', 'Payment for order 123', 'http://example.com/success', 'http://example.com/back', 'http://example.com/notify'),
  ('pay2', 'user2', 50.00, 'USD', 'PENDING', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'order124', 'Payment for order 124', 'http://example.com/success', 'http://example.com/back', 'http://example.com/notify');

-- Refund Table
INSERT INTO Refund (id, payment_id, amount, status, created_at)
VALUES
  ('refund1', 'pay1', 10.00, 'COMPLETED', CURRENT_TIMESTAMP),
  ('refund2', 'pay2', 5.00, 'PENDING', CURRENT_TIMESTAMP);

-- Accountability Table
INSERT INTO Accountability (id, payment_id, user_id, action, timestamp, notes)
VALUES
  ('acc1', 'pay1', 'user1', 'CREATE', CURRENT_TIMESTAMP, 'Initial payment creation'),
  ('acc2', 'pay2', 'user2', 'STATUS_CHANGE', CURRENT_TIMESTAMP, 'Payment marked as pending');

-- Car Table
INSERT INTO Car (id, make, model, year, color, price, mileage, fuelType, transmission)
VALUES
  ('car1', 'Toyota', 'Camry', 2018, 'Silver', 20000.00, 35000, 'Gasoline', 'Automatic'),
  ('car2', 'Honda', 'Civic', 2019, 'Red', 18000.00, 25000, 'Gasoline', 'Automatic'),
  ('car3', 'Ford', 'Mustang', 2020, 'Black', 35000.00, 15000, 'Gasoline', 'Manual'),
  ('car4', 'Chevrolet', 'Cruze', 2017, 'Blue', 15000.00, 40000, 'Gasoline', 'Automatic'),
  ('car5', 'BMW', 'X5', 2019, 'White', 50000.00, 20000, 'Diesel', 'Automatic');


INSERT INTO ShipmentTracking (id, orderId, shipmentId, trackingUrl, status, createdAt, updatedAt)
VALUES
  ('shipment1', 'order123', 'track123', 'http://tracking.com/track123', 'PENDING', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('shipment2', 'order124', 'track124', 'http://tracking.com/track124', 'PROCESSING', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('shipment3', 'order125', 'track125', 'http://tracking.com/track125', 'SHIPPED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('shipment4', 'order126', 'track126', 'http://tracking.com/track126', 'DELIVERED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
