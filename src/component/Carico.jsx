import { useState, useEffect } from "react";
import { Form, Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import "../App.css";

function Carico() {
  const [categoria, setCategoria] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [mezzoId, setMezzoId] = useState("");
  const [carichi, setCarichi] = useState([]);
  const token = localStorage.getItem("token");

  const fetchCarichi = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        setCarichi(data);
      } else if (Array.isArray(data.content)) {
        setCarichi(data.content);
      } else {
        setCarichi([]);
      }
    } catch {
      alert("Errore di rete o server.");
    }
  };

  const handleSearch = () => {
    let url = "http://localhost:8084/carichi";

    if (categoria) {
      url += `/filtracategoria?categoria=${categoria}`;
    } else if (descrizione) {
      url += `/filtradescrizione?descrizione=${descrizione}`;
    } else if (mezzoId) {
      url += `/filtramezzo?mezzoId=${mezzoId}`;
    }

    fetchCarichi(url);
  };

  useEffect(() => {
    fetchCarichi("http://localhost:8084/carichi");
  }, []);

  return (
    <div className="page-wrapper">
      <Form>
        <div className="form-container">
          <FormGroup className="form-group-stretto">
            <FormLabel>Categoria</FormLabel>
            <FormControl type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
          </FormGroup>
          <FormGroup className="form-group-stretto">
            <FormLabel>Descrizione</FormLabel>
            <FormControl type="text" value={descrizione} onChange={(e) => setDescrizione(e.target.value)} />
          </FormGroup>
          <FormGroup className="form-group-stretto">
            <FormLabel>ID Mezzo di Trasporto</FormLabel>
            <FormControl type="number" value={mezzoId} onChange={(e) => setMezzoId(e.target.value)} />
          </FormGroup>
          <Button variant="primary" className="bottone-stretto" onClick={handleSearch}>
            Cerca
          </Button>
        </div>
      </Form>

      <div className="ordine-tabella mt-4">
        {Array.isArray(carichi) && carichi.length === 0 ? (
          <p>Nessun carico trovato.</p>
        ) : (
          <table className="richieste-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Categoria</th>
                <th>Descrizione</th>
                <th>Volume</th>
                <th>ID Mezzo</th>
                <th>Prodotti Magazzino</th>
              </tr>
            </thead>
            <tbody>
              {carichi.map((c, index) => (
                <tr key={index}>
                  <td>{c.id}</td>
                  <td>{c.categoria ?? "N/D"}</td>
                  <td>{c.descrizione ?? "N/D"}</td>
                  <td>{c.volume ?? "N/D"}</td>
                  <td>{"TR-" + c.mezzoId}</td>
                  <td>
                    {Array.isArray(c.prodottoMagazzinoIds) && c.prodottoMagazzinoIds.length > 0
                      ? c.prodottoMagazzinoIds.map((id) => "PM-" + id).join(", ")
                      : "N/D"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Carico;
