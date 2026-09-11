-- SQLite Schema for Moc Viet Restaurant

-- Users table
CREATE TABLE IF NOT EXISTS User (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  fullName TEXT NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'CUSTOMER' CHECK(role IN ('CUSTOMER', 'STAFF', 'ADMIN')),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Restaurant tables
CREATE TABLE IF NOT EXISTS RestaurantTable (
  id TEXT PRIMARY KEY,
  tableNumber INTEGER UNIQUE NOT NULL,
  capacity INTEGER NOT NULL,
  area TEXT NOT NULL,
  status TEXT DEFAULT 'AVAILABLE' CHECK(status IN ('AVAILABLE', 'RESERVED', 'OCCUPIED', 'CLEANING'))
);

-- Reservations
CREATE TABLE IF NOT EXISTS Reservation (
  id TEXT PRIMARY KEY,
  userId TEXT,
  guestName TEXT NOT NULL,
  guestPhone TEXT NOT NULL,
  tableId TEXT,
  date DATETIME NOT NULL,
  guestsCount INTEGER NOT NULL,
  specialReq TEXT,
  status TEXT DEFAULT 'PENDING' CHECK(status IN ('PENDING', 'CONFIRMED', 'SEATED', 'COMPLETED', 'CANCELLED')),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES User(id) ON DELETE SET NULL,
  FOREIGN KEY (tableId) REFERENCES RestaurantTable(id) ON DELETE SET NULL
);

-- Menu items
CREATE TABLE IF NOT EXISTS MenuItem (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price REAL NOT NULL,
  category TEXT NOT NULL,
  isSignature BOOLEAN DEFAULT 0,
  spiceLevel INTEGER DEFAULT 0,
  isVegetarian BOOLEAN DEFAULT 0,
  imageUrl TEXT,
  isAvailable BOOLEAN DEFAULT 1
);

-- Favorites
CREATE TABLE IF NOT EXISTS Favorite (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  menuItemId TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
  FOREIGN KEY (menuItemId) REFERENCES MenuItem(id) ON DELETE CASCADE,
  UNIQUE(userId, menuItemId)
);

-- Reviews
CREATE TABLE IF NOT EXISTS Review (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);

-- Events managed by administrators
CREATE TABLE IF NOT EXISTS Event (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  capacity TEXT NOT NULL,
  price TEXT NOT NULL,
  image TEXT,
  isPublished BOOLEAN DEFAULT 1,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_User_email ON User(email);
CREATE INDEX IF NOT EXISTS idx_Reservation_userId ON Reservation(userId);
CREATE INDEX IF NOT EXISTS idx_Reservation_tableId ON Reservation(tableId);
CREATE INDEX IF NOT EXISTS idx_Reservation_date ON Reservation(date);
CREATE INDEX IF NOT EXISTS idx_Favorite_userId ON Favorite(userId);
CREATE INDEX IF NOT EXISTS idx_Review_userId ON Review(userId);
CREATE INDEX IF NOT EXISTS idx_MenuItem_category ON MenuItem(category);
CREATE INDEX IF NOT EXISTS idx_Event_date ON Event(date);
