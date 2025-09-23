import { useState, useEffect } from "react";
import { Form, Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import "./OrdiniClienti.css";

function OrdiniClienti() {
  const [fatturatoMax, setFatturatoMax] = useState("");
  const [dataInserimento, setDataInserimento] = useState("");
  const [ultimoContatto, setUltimoContatto] = useState("");
  const [ragioneSociale, setRagioneSociale] = useState("");

  const [clienti, setClienti] = useState([]);

  const token = localStorage.getItem("token");

  const fetchClienti = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (Array.isArray(data)) {
        setClienti(data);
      } else if (Array.isArray(data.content)) {
        setClienti(data.content);
      } else {
        setClienti([]);
      }
    } catch {
      alert("Errore di rete o server.");
    }
  };

  const handleSearch = () => {
    let url = "http://localhost:8084/clienti";

    if (fatturatoMax) {
      url += `/filtro/fatturato?fatturatoMax=${fatturatoMax}`;
    } else if (dataInserimento) {
      url += `/filtro/data-inserimento?data=${dataInserimento}`;
    } else if (ultimoContatto) {
      url += `/filtro/ultimo-contatto?data=${ultimoContatto}`;
    } else if (ragioneSociale) {
      url += `/filtro/nome?ragioneSociale=${ragioneSociale}`;
    }

    fetchClienti(url);
  };

  useEffect(() => {
    fetchClienti("http://localhost:8084/clienti");
  }, []);

  return (
    <div className="ordini-wrapper">
      <Form>
        <div className="ordini-form-container">
          <FormGroup className="ordini-form-group">
            <FormLabel>Fatturato massimo</FormLabel>
            <FormControl type="number" value={fatturatoMax} onChange={(e) => setFatturatoMax(e.target.value)} />
          </FormGroup>
          <FormGroup className="ordini-form-group">
            <FormLabel>Data inserimento</FormLabel>
            <FormControl type="date" value={dataInserimento} onChange={(e) => setDataInserimento(e.target.value)} />
          </FormGroup>
          <FormGroup className="ordini-form-group">
            <FormLabel>Ultimo contatto</FormLabel>
            <FormControl type="date" value={ultimoContatto} onChange={(e) => setUltimoContatto(e.target.value)} />
          </FormGroup>
          <FormGroup className="ordini-form-group">
            <FormLabel>Ragione sociale</FormLabel>
            <FormControl type="text" value={ragioneSociale} onChange={(e) => setRagioneSociale(e.target.value)} />
          </FormGroup>
          <Button className="ordini-bottone" onClick={handleSearch}>
            Cerca
          </Button>
        </div>
      </Form>

      <div className="ordini-tabella">
        {Array.isArray(clienti) && clienti.length === 0 ? (
          <p>Nessun cliente trovato.</p>
        ) : (
          <table className="ordini-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ragione Sociale</th>
                <th>Fatturato</th>
                <th>Data Inserimento</th>
                <th>Ultimo Contatto</th>
              </tr>
            </thead>
            <tbody>
              {clienti.map((c, index) => (
                <tr key={index}>
                  <td>{c.id}</td>
                  <td>{c.ragioneSociale}</td>
                  <td>{c.fatturato}</td>
                  <td>{c.dataInserimento}</td>
                  <td>{c.ultimoContatto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default OrdiniClienti;
