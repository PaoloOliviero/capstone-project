import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../App.css";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";

function MyNav() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h4 className="mb-4">StockX</h4>
      <Nav className="flex-column">
        <NavLink to="/" className="nav-link">
          Home
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

        <NavDropdown title="Link" id="sidebarDropdown">
          <NavDropdown.Item as={NavLink} to="/action">
            Action
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item as={NavLink} to="/altro">
            Something else here
          </NavDropdown.Item>
        </NavDropdown>

        <Nav.Link disabled>Link disabilitato</Nav.Link>

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
    </div>
  );
}

export default MyNav;
