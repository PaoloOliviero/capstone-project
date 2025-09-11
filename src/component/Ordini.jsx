import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FormCheck, FormControl, FormGroup, FormLabel, ToggleButton } from "react-bootstrap";
import "../App.css";

function Ordini() {
  return (
    <div className="page-wrapper">
      <FormCheck>
        <div className="form-container">
          <FormGroup controlId="exampleForm.ControlInput1">
            <FormLabel>N° ordine</FormLabel>
            <FormControl type="textarea" placeholder="" />
          </FormGroup>

          <FormGroup controlId="exampleForm.ControlInput2">
            <FormLabel>Nome Prodotto</FormLabel>
            <FormControl type="textarea" rows={3} />
          </FormGroup>

          <FormGroup controlId="exampleForm.ControlInput3">
            <FormLabel>Prezzo Max</FormLabel>
            <FormControl type="textarea" rows={3} />
          </FormGroup>

          <FormGroup controlId="exampleForm.ControlInput3">
            <FormLabel>Weight Max</FormLabel>
            <FormControl type="textarea" rows={3} />
          </FormGroup>

          <FormGroup controlId="exampleForm.ControlInput3">
            <FormLabel>Weigh Min</FormLabel>
            <FormControl type="textarea" rows={3} />
          </FormGroup>
          <FormGroup controlId="exampleForm.ControlInput3">
            <FormLabel>Stato ordine</FormLabel>
            <FormControl type="textarea" rows={3} />
          </FormGroup>
          <ToggleButton variant="primary" className="bottone-stretto">
            New Order
          </ToggleButton>
        </div>
      </FormCheck>
    </div>
  );
}

export default Ordini;
