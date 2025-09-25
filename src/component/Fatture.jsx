import { useState, useEffect } from "react";
import { Form, Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import "./OrdiniClienti.css";

function Fatture() {
  const [importoMax, setImportoMax] = useState("");
  const [dataEmissioneMax, setDataEmissioneMax] = useState("");
  const [statoNome, setStatoNome] = useState("");
  const [clienteId, setClienteId] = useState("");

  const [fatture, setFatture] = useState([]);

  const token = localStorage.getItem("token");

  const fetchFatture = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (Array.isArray(data)) {
        setFatture(data);
      } else if (Array.isArray(data.content)) {
        setFatture(data.content);
      } else {
        setFatture([]);
      }
    } catch {
      alert("Errore di rete o server.");
    }
  };

  const handleSearch = () => {
    let url = "http://localhost:8084/fatture";

    if (importoMax) {
      url += `/filtro/importo?importoMax=${importoMax}`;
    } else if (dataEmissioneMax) {
      url += `/filtro/emissione?dataEmissioneMax=${dataEmissioneMax}`;
    } else if (statoNome) {
      url += `/filtro/stato?statoNome=${statoNome}`;
    } else if (clienteId) {
      url += `/filtro/cliente?clienteId=${clienteId}`;
    }

    fetchFatture(url);
  };

  useEffect(() => {
    fetchFatture("http://localhost:8084/fatture");
  }, []);

  return (
    <div className="ordini-wrapper">
      <Form>
        <div className="ordini-form-container">
          <FormGroup className="ordini-form-group">
            <FormLabel>Importo massimo</FormLabel>
            <FormControl type="number" value={importoMax} onChange={(e) => setImportoMax(e.target.value)} />
          </FormGroup>
          <FormGroup className="ordini-form-group">
            <FormLabel>Data emissione</FormLabel>
            <FormControl type="date" value={dataEmissioneMax} onChange={(e) => setDataEmissioneMax(e.target.value)} />
          </FormGroup>
          <FormGroup className="ordini-form-group">
            <FormLabel>Stato fattura</FormLabel>
            <FormControl type="text" value={statoNome} onChange={(e) => setStatoNome(e.target.value)} />
          </FormGroup>
          <FormGroup className="ordini-form-group">
            <FormLabel>Cliente ID</FormLabel>
            <FormControl type="number" value={clienteId} onChange={(e) => setClienteId(e.target.value)} />
          </FormGroup>
          <Button className="ordini-bottone" onClick={handleSearch}>
            Cerca
          </Button>
        </div>
      </Form>

      <div className="ordini-tabella">
        {Array.isArray(fatture) && fatture.length === 0 ? (
          <p>Nessuna fattura trovata.</p>
        ) : (
          <table className="ordini-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Data Emissione</th>
                <th>Importo</th>
                <th>Stato</th>
                <th>Cliente ID</th>
              </tr>
            </thead>
            <tbody>
              {fatture.map((f, index) => (
                <tr key={index}>
                  <td>{f.id}</td>
                  <td>{f.data ?? "N/D"}</td>
                  <td>{f.importo ?? "N/D"}</td>
                  <td>{f.statoFattura ?? "N/D"}</td>
                  <td>{f.clienteId ?? "N/D"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Fatture;
