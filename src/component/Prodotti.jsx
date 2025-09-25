import { useState, useEffect } from "react";
import { Form, Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import "./OrdiniClienti.css";
function Prodotti() {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [prezzoMax, setPrezzoMax] = useState("");
  const [ordineClienteId, setOrdineClienteId] = useState("");

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
    let url = "http://localhost:8084/Prodotto";

    if (nome) {
      url += `/filtronome?nome=${nome}`;
    } else if (categoria) {
      url += `/filtrocategoria?categoria=${categoria}`;
    } else if (prezzoMax) {
      url += `/filtroprezzo?prezzoMax=${prezzoMax}`;
    } else if (ordineClienteId) {
      url += `/filtroordine?ordineClienteId=${ordineClienteId}`;
    }

    fetchProdotti(url);
  };

  useEffect(() => {
    fetchProdotti("http://localhost:8084/Prodotto");
  }, []);

  return (
    <div className="ordini-wrapper">
      <Form>
        <div className="ordini-form-container">
          <FormGroup className="ordini-form-group">
            <FormLabel>Nome prodotto</FormLabel>
            <FormControl type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </FormGroup>
          <FormGroup className="ordini-form-group">
            <FormLabel>Categoria</FormLabel>
            <FormControl type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
          </FormGroup>
          <FormGroup className="ordini-form-group">
            <FormLabel>Prezzo massimo</FormLabel>
            <FormControl type="number" value={prezzoMax} onChange={(e) => setPrezzoMax(e.target.value)} />
          </FormGroup>
          <FormGroup className="ordini-form-group">
            <FormLabel>ID Ordine Cliente</FormLabel>
            <FormControl type="number" value={ordineClienteId} onChange={(e) => setOrdineClienteId(e.target.value)} />
          </FormGroup>
          <Button className="ordini-bottone" onClick={handleSearch}>
            Cerca
          </Button>
        </div>
      </Form>

      <div className="ordini-tabella">
        {Array.isArray(prodotti) && prodotti.length === 0 ? (
          <p>Nessun prodotto trovato.</p>
        ) : (
          <table className="ordini-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Prezzo Unitario</th>
                <th>Categoria</th>
                <th>ID Ordine Cliente</th>
              </tr>
            </thead>
            <tbody>
              {prodotti.map((p, index) => (
                <tr key={index}>
                  <td>{p.id}</td>
                  <td>{p.nome}</td>
                  <td>{p.prezzoUnitario}</td>
                  <td>{p.categoria}</td>
                  <td>{p.ordineClienteId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Prodotti;
