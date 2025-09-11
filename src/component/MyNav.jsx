import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../App.css";

function MyNav() {
  return (
    <div className="sidebar">
      <h4 className="mb-4">Ordex</h4>
      <Nav className="flex-column">
        <Nav.Link href="#action1">Home</Nav.Link>
        <Nav.Link href="#action2">Ordini</Nav.Link>
        <Nav.Link href="#action2">Tracking</Nav.Link>
        <NavDropdown title="Link" id="sidebarDropdown">
          <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#" disabled>
          Link disabilitato
        </Nav.Link>
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
