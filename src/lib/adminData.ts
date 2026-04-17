export type AdminBookingStatus = "pending" | "pending_verification" | "paid" | "expired" | "rejected" | "cancelled";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AdminBooking {
  id: string;
  userId: string;
  court: string;
  date: string;
  time: string;
  status: AdminBookingStatus;
  total: number;
  uploadedProofUrl?: string; // dummy img
  createdAt: Date;
  expiresAt: Date;
}

export interface AdminCourt {
  id: number;
  name: string;
  location: string;
  price: number;
  type: "Indoor" | "Outdoor";
}

const now = new Date();

export const MOCK_USERS: User[] = [
  { id: "U-001", name: "Budi Santoso", email: "budi@example.com" },
  { id: "U-002", name: "Arif Wijaya", email: "arif@example.com" },
  { id: "U-003", name: "Siti Rahma", email: "siti@example.com" },
  { id: "U-004", name: "Andi R", email: "andi@example.com" },
];

export const MOCK_ADMIN_BOOKINGS: AdminBooking[] = [
  {
    id: "BKG-101",
    userId: "U-001",
    court: "Indoor Panoramic Court A",
    date: "16 May 2026",
    time: "19:00 - 20:00",
    status: "pending_verification",
    total: 350000,
    uploadedProofUrl: "https://images.unsplash.com/photo-1621503957827-de2fed05d5ec?w=500&q=80",
    createdAt: new Date(now.getTime() - 15 * 60000),
    expiresAt: new Date(now.getTime() + 5 * 60000),
  },
  {
    id: "BKG-102",
    userId: "U-002",
    court: "Outdoor Classic Court",
    date: "17 May 2026",
    time: "20:00 - 22:00",
    status: "pending",
    total: 400000,
    createdAt: new Date(now.getTime() - 2 * 60000),
    expiresAt: new Date(now.getTime() + 13 * 60000),
  },
  {
    id: "BKG-098",
    userId: "U-004",
    court: "Padel Court A (Premium)",
    date: "10 May 2026",
    time: "08:00 - 10:00",
    status: "paid",
    total: 300000,
    createdAt: new Date(now.getTime() - 86400000),
    expiresAt: new Date(now.getTime() - 86400000 + 15 * 60000),
  },
  {
    id: "BKG-082",
    userId: "U-003",
    court: "Indoor Panoramic Court B",
    date: "01 May 2026",
    time: "16:00 - 17:00",
    status: "expired",
    total: 300000,
    createdAt: new Date(now.getTime() - 2 * 86400000),
    expiresAt: new Date(now.getTime() - 2 * 86400000 + 15 * 60000),
  },
  {
    id: "BKG-022",
    userId: "U-XYZ", // Simulate missing user
    court: "Indoor Panoramic Court A",
    date: "22 May 2026",
    time: "14:00 - 15:00",
    status: "pending",
    total: 150000,
    createdAt: new Date(now.getTime() - 10 * 60000),
    expiresAt: new Date(now.getTime() + 5 * 60000),
  }
];

export const MOCK_ADMIN_COURTS: AdminCourt[] = [
  { id: 1, name: "Padel Court A (Premium)", location: "Banyumanik, Semarang", price: 150000, type: "Indoor" },
  { id: 2, name: "Indoor Panoramic Court", location: "Tembalang, Semarang", price: 200000, type: "Indoor" },
  { id: 3, name: "Outdoor Classic Court", location: "Simpang Lima, Semarang", price: 120000, type: "Outdoor" },
];
