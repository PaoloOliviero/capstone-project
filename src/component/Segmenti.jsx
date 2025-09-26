import { useState, useEffect } from "react";
import { Form, Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import "./OrdiniClienti.css";

function Segmenti() {
  const [nome, setNome] = useState("");
  const [tipologiaSegmento, setTipologiaSegmento] = useState("");
  const [segmenti, setSegmenti] = useState([]);

  const token = localStorage.getItem("token");

  const fetchSegmenti = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (Array.isArray(data)) {
        setSegmenti(data);
      } else if (Array.isArray(data.content)) {
        setSegmenti(data.content);
      } else {
        setSegmenti([]);
      }
    } catch {
      alert("Errore di rete o server.");
    }
  };

  const handleSearch = () => {
    let url = "http://localhost:8084/segmenti";

    if (nome) {
      url += `/filtro/nome?nome=${nome}`;
    } else if (tipologiaSegmento) {
      url += `/filtro/tipologia?tipoSegmento=${tipologiaSegmento}`;
    }

    fetchSegmenti(url);
  };

  useEffect(() => {
    fetchSegmenti("http://localhost:8084/segmenti?page=0&size=50&sortBy=id");
  }, []);

  return (
    <div className="ordini-wrapper">
      <Form>
        <div className="ordini-form-container">
          <FormGroup className="ordini-form-group">
            <FormLabel>Nome segmento</FormLabel>
            <FormControl type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </FormGroup>
          <FormGroup className="ordini-form-group">
            <FormLabel>Tipologia segmento</FormLabel>
            <FormControl type="text" value={tipologiaSegmento} onChange={(e) => setTipologiaSegmento(e.target.value)} />
          </FormGroup>
          <Button className="ordini-bottone" onClick={handleSearch}>
            Cerca
          </Button>
        </div>
      </Form>

      <div className="ordini-tabella">
        {Array.isArray(segmenti) && segmenti.length === 0 ? (
          <p>Nessun segmento trovato.</p>
        ) : (
          <table className="ordini-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Tipologia</th>
                <th>Criterio</th>
              </tr>
            </thead>
            <tbody>
              {segmenti.map((s, index) => (
                <tr key={index}>
                  <td>{s.id}</td>
                  <td>{s.nome}</td>
                  <td>{s.tipologiaSegmento ?? "—"}</td>
                  <td>{s.criterio ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Segmenti;
