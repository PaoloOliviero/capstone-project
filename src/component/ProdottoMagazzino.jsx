import { useState, useEffect } from "react";
import { Form, Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import "../App.css";

function ProdottoMagazzino() {
  const [quantita, setQuantita] = useState("");
  const [dataIngresso, setDataIngresso] = useState("");
  const [prodottoId, setProdottoId] = useState("");
  const [magazzinoId, setMagazzinoId] = useState("");

  const [prodotti, setProdotti] = useState([]);

  const token = localStorage.getItem("token");

  const fetchProdotti = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (Array.isArray(data)) {
        setProdotti(data);
      } else if (Array.isArray(data.content)) {
        setProdotti(data.content);
      } else {
        setProdotti([]);
      }
    } catch {
      alert("Errore di rete o server.");
    }
  };

  const handleSearch = () => {
    let url = "http://localhost:8084/ProdottoMagazzino";

    if (quantita) {
      url += `/filtroquantita?quantita=${quantita}`;
    } else if (dataIngresso) {
      url += `/filtrodata?dataIngresso=${dataIngresso}`;
    } else if (prodottoId) {
      url += `/filtroprodotto?prodottoId=${prodottoId}`;
    } else if (magazzinoId) {
      url += `/filtromagazzino?magazzinoId=${magazzinoId}`;
    }

    fetchProdotti(url);
  };

  useEffect(() => {
    fetchProdotti("http://localhost:8084/ProdottoMagazzino/con-relazioni");
  }, []);

  return (
    <div className="page-wrapper">
      <Form>
        <div className="form-container">
          <FormGroup className="form-group-stretto">
            <FormLabel>Quantità disponibile</FormLabel>
            <FormControl type="number" value={quantita} onChange={(e) => setQuantita(e.target.value)} />
          </FormGroup>
          <FormGroup className="form-group-stretto">
            <FormLabel>Data ingresso</FormLabel>
            <FormControl type="date" value={dataIngresso} onChange={(e) => setDataIngresso(e.target.value)} />
          </FormGroup>
          <FormGroup className="form-group-stretto">
            <FormLabel>Prodotto ID</FormLabel>
            <FormControl type="number" value={prodottoId} onChange={(e) => setProdottoId(e.target.value)} />
          </FormGroup>
          <FormGroup className="form-group-stretto">
            <FormLabel>Magazzino ID</FormLabel>
            <FormControl type="number" value={magazzinoId} onChange={(e) => setMagazzinoId(e.target.value)} />
          </FormGroup>
          <Button variant="primary" className="bottone-stretto" onClick={handleSearch}>
            Cerca
          </Button>
        </div>
      </Form>

      <div className="ordine-tabella mt-4">
        {Array.isArray(prodotti) && prodotti.length === 0 ? (
          <p>Nessun prodotto magazzino trovato.</p>
        ) : (
          <table className="richieste-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Quantità</th>
                <th>Data ingresso</th>
                <th>Prodotto</th>
                <th>Magazzino</th>
              </tr>
            </thead>
            <tbody>
              {prodotti.map((p, index) => (
                <tr key={index}>
                  <td>{p.id}</td>
                  <td>{p.quantitaDisponibile}</td>
                  <td>{p.dataIngresso}</td>
                  <td>{"PM-" + p.prodottoId}</td>
                  <td>{"MG-" + p.magazzinoId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProdottoMagazzino;
