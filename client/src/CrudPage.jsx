import { useCallback, useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Modal, Row, Spinner, Table } from "react-bootstrap";
import { apiRequest } from "./api";

export default function CrudPage({ title, endpoint, fields }) {
  const emptyForm = () => Object.fromEntries(fields.map((field) => [field.name, ""]));
  const [rows, setRows] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadRows = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiRequest(`/api/${endpoint}`);
      setRows(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => { loadRows(); }, [loadRows]);

  const openCreate = () => {
    setEditingId(null);
    setFormData(emptyForm());
    setNotice("");
    setShow(true);
  };

  const openEdit = (row) => {
    setEditingId(row.id);
    setFormData(Object.fromEntries(fields.map((field) => [field.name, row[field.name] ?? ""])));
    setNotice("");
    setShow(true);
  };

  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, value === "" ? null : value])
      );
      await apiRequest(
        editingId ? `/api/${endpoint}/${editingId}` : `/api/${endpoint}`,
        { method: editingId ? "PUT" : "POST", body: JSON.stringify(payload) }
      );
      setShow(false);
      setNotice(editingId ? `${title} updated successfully.` : `${title} added successfully.`);
      await loadRows();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (row) => {
    if (!window.confirm(`Delete this ${title.toLowerCase()} record?`)) return;
    setError("");
    try {
      await apiRequest(`/api/${endpoint}/${row.id}`, { method: "DELETE" });
      setNotice(`${title} deleted successfully.`);
      await loadRows();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <p className="eyebrow mb-1">RECORD MANAGEMENT</p>
          <h1 className="page-title mb-1">{title}</h1>
          <p className="text-secondary mb-0">Create, view, update and delete {title.toLowerCase()} records.</p>
        </div>
        <Button onClick={openCreate}>+ Add {title.replace(/s$/, "")}</Button>
      </div>

      {notice && <Alert variant="success" dismissible onClose={() => setNotice("")}>{notice}</Alert>}
      {error && <Alert variant="danger" dismissible onClose={() => setError("")}>{error}</Alert>}

      <Card className="border-0 shadow-sm">
        <Card.Body>
          {loading ? (
            <div className="text-center py-5"><Spinner animation="border" /> <div className="mt-2">Loading {title.toLowerCase()}...</div></div>
          ) : rows.length === 0 ? (
            <div className="text-center text-secondary py-5">
              <div className="fs-1 mb-2">📄</div>
              No records found. Select “Add” to create your first record.
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover className="align-middle mb-0">
                <thead><tr><th>ID</th>{fields.map((field) => <th key={field.name}>{field.label}</th>)}<th className="text-end">Actions</th></tr></thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      {fields.map((field) => <td key={field.name}>{row[field.name] ?? "—"}</td>)}
                      <td className="text-end text-nowrap">
                        <Button size="sm" variant="outline-primary" className="me-2" onClick={() => openEdit(row)}>Edit</Button>
                        <Button size="sm" variant="outline-danger" onClick={() => remove(row)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Form onSubmit={save}>
          <Modal.Header closeButton>
            <Modal.Title>{editingId ? "Edit" : "Add"} {title.replace(/s$/, "")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="g-3">
              {fields.map((field) => (
                <Col xs={12} key={field.name}>
                  <Form.Group>
                    <Form.Label>{field.label}</Form.Label>
                    <Form.Control
                      type={field.type || "text"}
                      required={field.required !== false}
                      value={formData[field.name] ?? ""}
                      onChange={(event) => setFormData((old) => ({ ...old, [field.name]: event.target.value }))}
                      placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                    />
                  </Form.Group>
                </Col>
              ))}
            </Row>
            <Form.Text className="text-secondary">For related records, enter the existing database ID in the ID fields.</Form.Text>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
            <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}
