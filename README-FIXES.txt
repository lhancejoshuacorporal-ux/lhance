SHIPPING LINE MANAGEMENT SYSTEM - FIXED PROJECT

PROJECT STRUCTURE
- client: React + Vite frontend
- server: Express + Sequelize + MySQL backend

IMPORTANT DATABASE SETUP
1. Open MySQL Workbench and connect to your local MySQL server.
2. Check server/config/config.json. The database name, username, password, host and dialect must match your MySQL setup.
3. Create the database named in config.json if it does not already exist. For the current supplied config, run:
   CREATE DATABASE database_development;
   Use the exact database name configured in server/config/config.json.
4. Do not share your real database password publicly.

RUN BACKEND
Open a terminal:
  cd "shipping line/server"
  npm install
  npm start

Expected:
  MySQL connected successfully.
  Database models synchronized.
  Shipping Line API: http://localhost:3007

Test:
  http://localhost:3007/
  http://localhost:3007/api/customers

RUN FRONTEND
Open a SECOND terminal:
  cd "shipping line/client"
  npm install
  npm run dev

Open the local URL Vite prints, usually:
  http://localhost:5173

FEATURES
- Dashboard record counts
- Customer CRUD
- Booking CRUD
- Shipment CRUD
- Payment CRUD
- Ship CRUD
- Port CRUD

RELATIONSHIP FIELDS
- Booking: CustomerId must refer to an existing Customer ID.
- Shipment: BookingId, ShipId and PortId must refer to existing records.
- Payment: BookingId must refer to an existing Booking ID.

NOTES
- This project uses the existing Sequelize associations and default foreign-key names.
- The backend uses sequelize.sync() to create missing tables. It does not automatically alter existing table structures.
- If you already have older tables with different column names or data types, back up the database before making schema changes.
- Shipment keeps the original model field spelling "weigth" so existing database/API naming remains compatible.
