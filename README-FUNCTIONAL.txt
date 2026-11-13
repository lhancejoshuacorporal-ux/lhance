SHIPPING LINE MANAGEMENT SYSTEM

PROJECT
- client: React + Vite + React Bootstrap
- server: Express + Sequelize + MySQL

IMPORTANT: DATABASE LOGIN
Open server/config/config.json and set:
- username: your actual MySQL username
- password: your actual MySQL password
- database: lancy_db (or the schema you actually use)
- host: 127.0.0.1

The current config uses username "admin" and password "admin1234".
Those are only correct if you created that MySQL account and password.
Do not share your real database password.

DATABASE SAFETY
The backend runs sequelize.sync() without alter or force. It creates missing model tables,
but does not alter or delete existing tables. If your existing tables have different names
or columns, you may need to reconcile the schema after backing up the database.

RUN BACKEND (terminal 1)
cd "shipping line/server"
npm install
npm start

Expected messages:
MySQL connected successfully!
Database models synchronized.
Shipping Line API running at http://localhost:3007

Open http://localhost:3007/ to test the API health check.

RUN FRONTEND (terminal 2)
cd "shipping line/client"
npm install
npm run dev

Open the Vite URL, normally http://localhost:5173.

CRUD FEATURES
Customers, Ships, Ports, Bookings, Shipments and Payments:
- View list
- Add record
- Edit record
- Delete record

API ENDPOINTS
GET/POST   /api/customer
GET/PUT/DELETE /api/customer/:id
GET/POST   /api/ship
GET/PUT/DELETE /api/ship/:id
GET/POST   /api/port
GET/PUT/DELETE /api/port/:id
GET/POST   /api/booking
GET/PUT/DELETE /api/booking/:id
GET/POST   /api/shipment
GET/PUT/DELETE /api/shipment/:id
GET/POST   /api/payment
GET/PUT/DELETE /api/payment/:id

FOREIGN KEYS
- Booking CustomerId must refer to an existing Customer.
- Shipment BookingId, ShipId and PortId must refer to existing records.
- Payment BookingId must refer to an existing Booking.
Create Customers, Ships and Ports first, then create Bookings, Shipments and Payments.
