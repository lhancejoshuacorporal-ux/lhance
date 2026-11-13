import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import TopNav from "./components/TopNav";
import Dashboard from "./Dashboard";
import CrudPage from "./CrudPage";

const pages = [
  { path: "customers", title: "Customers", endpoint: "customer", fields: [
    { name: "name", label: "Full name" },
    { name: "phone", label: "Phone number" },
    { name: "address", label: "Address" }
  ]},
  { path: "bookings", title: "Bookings", endpoint: "booking", fields: [
    { name: "booking_date", label: "Booking date", type: "date" },
    { name: "status", label: "Status", placeholder: "Pending / Confirmed / Cancelled" },
    { name: "CustomerId", label: "Customer ID", type: "number" }
  ]},
  { path: "shipments", title: "Shipments", endpoint: "shipment", fields: [
    { name: "cargo_type", label: "Cargo type" },
    { name: "weight", label: "Weight" },
    { name: "departure_date", label: "Departure date", type: "date" },
    { name: "arrival_date", label: "Arrival date", type: "date" },
    { name: "BookingId", label: "Booking ID", type: "number" },
    { name: "ShipId", label: "Ship ID", type: "number" },
    { name: "PortId", label: "Port ID", type: "number" }
  ]},
  { path: "payments", title: "Payments", endpoint: "payment", fields: [
    { name: "amount", label: "Amount", type: "number" },
    { name: "payment_date", label: "Payment date", type: "date" },
    { name: "payment_status", label: "Payment status" },
    { name: "BookingId", label: "Booking ID", type: "number" }
  ]},
  { path: "ships", title: "Ships", endpoint: "ship", fields: [
    { name: "ship_name", label: "Ship name" },
    { name: "ship_type", label: "Ship type" },
    { name: "capacity", label: "Capacity" },
    { name: "status", label: "Status" }
  ]},
  { path: "ports", title: "Ports", endpoint: "port", fields: [
    { name: "port_name", label: "Port name" },
    { name: "location", label: "Location" }
  ]}
];

function AppLayout() {
  return (
    <>
      <TopNav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {pages.map((page) => (
          <Route key={page.path} path={`/${page.path}`} element={<CrudPage {...page} />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer className="app-footer">Shipping Line Management System</footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
