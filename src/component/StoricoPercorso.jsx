import { useState, useEffect } from "react";
import { Form, Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import "../App.css";

function StoricoPercorrenze() {
  const [tempoTratta, setTempoTratta] = useState("");
  const [mezzoId, setMezzoId] = useState("");
  const [autistaId, setAutistaId] = useState("");
  const [magazzinoEntrataId, setMagazzinoEntrataId] = useState("");
  const [magazzinoUscitaId, setMagazzinoUscitaId] = useState("");

  const [storici, setStorici] = useState([]);

  const token = localStorage.getItem("token");

  const fetchStorici = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      const lista = Array.isArray(data.content) ? data.content : [];
      setStorici(lista);
    } catch (err) {
      console.error("Errore:", err);
      alert("Errore di rete o server.");
    }
  };

  const handleSearch = () => {
    let url = "http://localhost:8084/storico-percorrenze";

    if (tempoTratta) {
      url += `/filtra-tempo?tempo=${tempoTratta}`;
    } else if (mezzoId) {
      url += `/filtra-mezzo/${mezzoId}`;
    } else if (autistaId) {
      url += `/filtra-autista/${autistaId}`;
    } else if (magazzinoEntrataId) {
      url += `/filtra-entrata/${magazzinoEntrataId}`;
    } else if (magazzinoUscitaId) {
      url += `/filtra-uscita/${magazzinoUscitaId}`;
    }

    fetchStorici(url);
  };

  useEffect(() => {
    fetchStorici("http://localhost:8084/storico-percorrenze");
  }, []);

  return (
    <div className="page-wrapper">
      <Form>
        <div className="form-container">
          <FormGroup className="form-group-stretto">
            <FormLabel>Tempo effettivo tratta</FormLabel>
            <FormControl type="number" value={tempoTratta} onChange={(e) => setTempoTratta(e.target.value)} />
          </FormGroup>
          <FormGroup className="form-group-stretto">
            <FormLabel>Mezzo ID</FormLabel>
            <FormControl type="number" value={mezzoId} onChange={(e) => setMezzoId(e.target.value)} />
          </FormGroup>
          <FormGroup className="form-group-stretto">
            <FormLabel>Autista ID</FormLabel>
            <FormControl type="number" value={autistaId} onChange={(e) => setAutistaId(e.target.value)} />
          </FormGroup>
          <FormGroup className="form-group-stretto">
            <FormLabel>Magazzino Entrata ID</FormLabel>
            <FormControl type="number" value={magazzinoEntrataId} onChange={(e) => setMagazzinoEntrataId(e.target.value)} />
          </FormGroup>
          <FormGroup className="form-group-stretto">
            <FormLabel>Magazzino Uscita ID</FormLabel>
            <FormControl type="number" value={magazzinoUscitaId} onChange={(e) => setMagazzinoUscitaId(e.target.value)} />
          </FormGroup>
          <Button variant="primary" className="bottone-stretto" onClick={handleSearch}>
            Cerca
          </Button>
        </div>
      </Form>

      <div className="ordine-tabella mt-4">
        {Array.isArray(storici) && storici.length === 0 ? (
          <p>Nessun storico percorso trovato.</p>
        ) : (
          <table className="richieste-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Data Registrazione</th>
                <th>Mezzo</th>
                <th>Autista</th>
                <th>Magazzino Entrata</th>
                <th>Magazzino Uscita</th>
                <th>Prodotto Magazzino</th>
              </tr>
            </thead>
            <tbody>
              {storici.map((s, index) => (
                <tr key={index}>
                  <td>{s.id}</td>
                  <td>{s.dataRegistrazione}</td>
                  <td>{"TR-" + s.mezzoDiTrasporto?.id}</td>
                  <td>{"AT-" + s.autista?.id}</td>
                  <td>{"MG-" + s.magazzinoEntrata?.id}</td>
                  <td>{"MG-" + s.magazzinoUscita?.id}</td>
                  <td>{"PM-" + s.prodottoMagazzino?.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default StoricoPercorrenze;
