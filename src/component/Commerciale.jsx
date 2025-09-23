import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Clienti from "./Clienti";
import Spedizioni from "./Spedizioni";
import Prodotti from "./Prodotti";
import OrdiniClienti from "./OrdiniClienti";
import Fatture from "./Fatture";

function Commerciale() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Area Commerciale</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/commerciale/clienti">
              Clienti
            </Nav.Link>
            <Nav.Link as={NavLink} to="/commerciale/OrdiniClienti">
              Ordini Clienti
            </Nav.Link>
            <Nav.Link as={NavLink} to="/commerciale/fatture">
              Fatture
            </Nav.Link>
            <Nav.Link as={NavLink} to="/commerciale/prodotti">
              Prodotti
            </Nav.Link>
            <Nav.Link as={NavLink} to="/commerciale/spedizioni">
              Spedizioni
            </Nav.Link>
          </Nav>

          <Button variant="outline-light" onClick={() => navigate("/operativo")}>
            Vai a Gestione Operativa
          </Button>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="clienti" element={<Clienti />} />
          <Route path="ordini-clienti" element={<OrdiniClienti />} />
          <Route path="fatture" element={<Fatture />} />
          <Route path="prodotti" element={<Prodotti />} />
          <Route path="spedizioni" element={<Spedizioni />} />
        </Routes>
      </Container>
    </>
  );
}

export default Commerciale;
