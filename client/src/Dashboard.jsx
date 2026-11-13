
import { useEffect, useState } from "react";
import { Alert, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router";
import { apiRequest } from "./api";

const sections = [
  { key: "customers", apiPath: "customer", label: "Customers", path: "/customers", icon: "👥" },
  { key: "bookings", apiPath: "booking", label: "Bookings", path: "/bookings", icon: "📋" },
  { key: "shipments", apiPath: "shipment", label: "Shipments", path: "/shipments", icon: "📦" },
  { key: "payments", apiPath: "payment", label: "Payments", path: "/payments", icon: "💳" },
  { key: "ships", apiPath: "ship", label: "Ships", path: "/ships", icon: "🚢" },
  { key: "ports", apiPath: "port", label: "Ports", path: "/ports", icon: "⚓" }
];

export default function Dashboard() {
  const [counts, setCounts] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    Promise.all(
      sections.map(async (item) => {
        const rows = await apiRequest(`/api/${item.apiPath}`);

        if (!Array.isArray(rows)) {
          throw new Error(`${item.label} API did not return an array`);
        }

        return [item.key, rows.length];
      })
    )
      .then((entries) => {
        if (active) {
          setCounts(Object.fromEntries(entries));
          setError("");
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <Container className="py-4">
      <div className="mb-4">
        <p className="eyebrow mb-1">OPERATIONS OVERVIEW</p>
        <h1 className="page-title">Shipping Line Dashboard</h1>
        <p className="text-secondary">
          Manage your customers, bookings, cargo, vessels and ports.
        </p>
      </div>

      {error && (
        <Alert variant="danger">
          Cannot load dashboard: {error}. Make sure the backend and MySQL are running.
        </Alert>
      )}

      {loading && (
        <div className="py-4">
          <Spinner animation="border" />
          <span className="ms-2">Loading records...</span>
        </div>
      )}

      <Row className="g-3">
        {sections.map((item) => (
          <Col key={item.key} xs={12} sm={6} lg={4}>
            <Card
              as={Link}
              to={item.path}
              className="summary-card h-100 text-decoration-none"
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-secondary">{item.label}</div>
                    <div className="summary-number">
                      {loading ? "—" : (counts[item.key] ?? 0)}
                    </div>
                  </div>

                  <span className="summary-icon">{item.icon}</span>
                </div>

                <div className="small text-primary mt-3">
                  Manage {item.label.toLowerCase()} →
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
