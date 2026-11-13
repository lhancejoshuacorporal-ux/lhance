import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router";

const links = [
  ["Dashboard", "/"],
  ["Customers", "/customers"],
  ["Bookings", "/bookings"],
  ["Shipments", "/shipments"],
  ["Payments", "/payments"],
  ["Ships", "/ships"],
  ["Ports", "/ports"]
];

export default function TopNav() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container fluid="lg">
        <Navbar.Brand as={Link} to="/">⚓ Shipping Line</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            {links.map(([label, path]) => (
              <Nav.Link key={path} as={NavLink} to={path} end={path === "/"}>
                {label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
