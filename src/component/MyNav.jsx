import { useState, useRef, useEffect } from "react";
import { BellFill } from "react-bootstrap-icons";
import { Button, Form, Nav, NavDropdown, Overlay, Popover, Badge } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";

function MyNav() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [notifiche, setNotifiche] = useState([]);
  const [showNotifiche, setShowNotifiche] = useState(false);
  const bellRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchNotifiche = async () => {
    try {
      const response = await fetch("http://localhost:8084/notifiche", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setNotifiche(Array.isArray(data) ? data : []);
    } catch {
      alert("Errore nel recupero delle notifiche.");
    }
  };

  useEffect(() => {
    fetchNotifiche();
  }, []);

  const handleToggleNotifiche = () => {
    const aggiornate = notifiche.map((n) => ({ ...n, visualizzata: true }));
    setNotifiche(aggiornate);
    setShowNotifiche(!showNotifiche);
  };

  const nonVisualizzate = notifiche.filter((n) => !n.visualizzata).length;

  return (
    <div className="sidebar">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h4 className="mb-0">StockX</h4>
        <Button
          variant="outline-secondary"
          ref={bellRef}
          onClick={handleToggleNotifiche}
          style={{ borderRadius: "50%", padding: "6px 10px", position: "relative" }}
        >
          <BellFill />
          {nonVisualizzate > 0 && (
            <Badge bg="danger" pill style={{ position: "absolute", top: "-5px", right: "-5px" }}>
              {nonVisualizzate}
            </Badge>
          )}
        </Button>
      </div>

      <Nav className="flex-column">
        <NavLink to="/ticket" className="nav-link">
          Home - Ticket
        </NavLink>
        <NavLink to="/magazzino" className="nav-link">
          Prodotto Magazzino
        </NavLink>
        <NavLink to="/richieste" className="nav-link">
          Richieste Prodotto
        </NavLink>
        <NavLink to="/storico" className="nav-link">
          Storico Percorsi
        </NavLink>
        <NavLink to="/movimenti" className="nav-link">
          Movimento Magazzino
        </NavLink>
        <NavLink to="/carichi" className="nav-link">
          Carichi
        </NavLink>

        <NavDropdown title="Link" id="sidebarDropdown" className="nav-link link-custom">
          <NavDropdown.Item as={NavLink} to="/commerciale">
            Commerciale
          </NavDropdown.Item>
        </NavDropdown>

        {token ? (
          <Button variant="outline-danger" className="mt-3" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <NavLink to="/login" className="nav-link mt-3">
            Login
          </NavLink>
        )}
      </Nav>

      <Form className="mt-4">
        <Form.Control type="search" placeholder="Search" className="mb-2" />
        <Button variant="outline-success" className="w-100">
          Search
        </Button>
      </Form>

      <Overlay show={showNotifiche} target={bellRef.current} placement="right" containerPadding={20}>
        <Popover style={{ borderRadius: "10px", maxWidth: "300px" }}>
          <Popover.Header as="h3">Notifiche</Popover.Header>
          <Popover.Body>
            {notifiche.length === 0 ? (
              <p className="text-muted">Nessuna notifica disponibile.</p>
            ) : (
              <ul style={{ paddingLeft: "1rem", marginBottom: 0 }}>
                {notifiche.map((n) => (
                  <li key={n.id} style={{ marginBottom: "0.75rem" }}>
                    <strong>{n.titolo}</strong>
                    <br />
                    <span>{n.descrizione}</span>
                    <br />
                    <small className="text-muted">
                      {new Date(n.data).toLocaleString()} – {n.cliente}
                    </small>
                    {!n.visualizzata && (
                      <Badge bg="warning" className="ms-2">
                        Nuova
                      </Badge>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}

export default MyNav;
