import Database from "better-sqlite3";
import path from "path";

let db: Database.Database;

export function getDatabase() {
  if (!db) {
    const dbPath = path.join(process.cwd(), "dev.db");
    db = new Database(dbPath);
    // Enable foreign keys
    db.pragma("foreign_keys = ON");
  }
  return db;
}

export interface User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  role: "CUSTOMER" | "STAFF" | "ADMIN";
  createdAt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isSignature: boolean;
  spiceLevel: number;
  isVegetarian: boolean;
  imageUrl?: string;
  isAvailable: boolean;
}

export interface Reservation {
  id: string;
  userId?: string;
  guestName: string;
  guestPhone: string;
  tableId?: string;
  date: string;
  guestsCount: number;
  specialReq?: string;
  status: "PENDING" | "CONFIRMED" | "SEATED" | "COMPLETED" | "CANCELLED";
  createdAt: string;
}

// Query functions
export function getMenuItems() {
  const db = getDatabase();
  return db.prepare("SELECT * FROM MenuItem WHERE isAvailable = 1 ORDER BY category, name").all() as MenuItem[];
}

export function getMenuItemsByCategory(category: string) {
  const db = getDatabase();
  return db.prepare("SELECT * FROM MenuItem WHERE category = ? AND isAvailable = 1 ORDER BY name").all(category) as MenuItem[];
}

export function getSignatureMenuItems() {
  const db = getDatabase();
  return db.prepare("SELECT * FROM MenuItem WHERE isSignature = 1 AND isAvailable = 1 ORDER BY name").all() as MenuItem[];
}

export function createReservation(data: Omit<Reservation, "id" | "createdAt">) {
  const db = getDatabase();
  const id = crypto.randomUUID?.() || Date.now().toString();
  return db
    .prepare(
      "INSERT INTO Reservation (id, userId, guestName, guestPhone, tableId, date, guestsCount, specialReq, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    )
    .run(
      id,
      data.userId || null,
      data.guestName,
      data.guestPhone,
      data.tableId || null,
      data.date,
      data.guestsCount,
      data.specialReq || null,
      data.status,
      new Date().toISOString()
    );
}

export function getReservationsByDate(date: string) {
  const db = getDatabase();
  return db.prepare("SELECT * FROM Reservation WHERE DATE(date) = ? AND status != 'CANCELLED' ORDER BY date").all(date) as Reservation[];
}

export function getTables() {
  const db = getDatabase();
  return db.prepare("SELECT * FROM RestaurantTable ORDER BY tableNumber").all();
}

export function checkTableAvailability(capacity: number, dateTime: string) {
  const db = getDatabase();
  const tables = db
    .prepare(
      `
    SELECT rt.id, rt.tableNumber, rt.capacity, rt.status
    FROM RestaurantTable rt
    WHERE rt.capacity >= ?
      AND (rt.status = 'AVAILABLE' OR (rt.id NOT IN (
        SELECT tableId FROM Reservation WHERE DATE(date) = DATE(?) AND status != 'CANCELLED'
      )))
    ORDER BY rt.capacity
    `
    )
    .all(capacity, dateTime);
  return tables;
}
