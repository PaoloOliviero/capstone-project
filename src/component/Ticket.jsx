import { useState, useEffect } from "react";
import { Form, Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import "../App.css";

function Ticket() {
  const [titolo, setTitolo] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [dataCreazione, setDataCreazione] = useState("");
  const [ordineId, setOrdineId] = useState("");

  const [tickets, setTickets] = useState([]);

  const token = localStorage.getItem("token");

  const fetchTickets = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (Array.isArray(data)) {
        setTickets(data);
      } else if (Array.isArray(data.content)) {
        setTickets(data.content);
      } else {
        setTickets([]);
      }
    } catch {
      alert("Errore di rete o server.");
    }
  };

  const handleSearch = () => {
    let url = "http://localhost:8084/tickets";

    if (titolo) {
      url += `/filtrotitolo?titolo=${encodeURIComponent(titolo)}`;
    } else if (descrizione) {
      url += `/filtrodescrizione?descrizione=${encodeURIComponent(descrizione)}`;
    } else if (dataCreazione) {
      url += `/filtrodata?dataCreazione=${dataCreazione}T00:00:00`;
    } else if (ordineId) {
      url += `/filtroordine?ordineId=${ordineId}`;
    } else {
      url += "/con-relazioni";
    }

    fetchTickets(url);
  };

  useEffect(() => {
    fetchTickets("http://localhost:8084/tickets");
  }, []);

  return (
    <div className="page-wrapper">
      <Form>
        <div className="form-container">
          <FormGroup className="form-group-stretto">
            <FormLabel>Titolo</FormLabel>
            <FormControl type="text" value={titolo} onChange={(e) => setTitolo(e.target.value)} />
          </FormGroup>
          <FormGroup className="form-group-stretto">
            <FormLabel>Descrizione</FormLabel>
            <FormControl type="text" value={descrizione} onChange={(e) => setDescrizione(e.target.value)} />
          </FormGroup>
          <FormGroup className="form-group-stretto">
            <FormLabel>Data creazione</FormLabel>
            <FormControl type="date" value={dataCreazione} onChange={(e) => setDataCreazione(e.target.value)} />
          </FormGroup>
          <FormGroup className="form-group-stretto">
            <FormLabel>Ordine ID</FormLabel>
            <FormControl type="number" value={ordineId} onChange={(e) => setOrdineId(e.target.value)} />
          </FormGroup>
          <Button variant="primary" className="bottone-stretto" onClick={handleSearch}>
            Cerca
          </Button>
        </div>
      </Form>

      <div className="ordine-tabella mt-4">
        {Array.isArray(tickets) && tickets.length === 0 ? (
          <p>Nessun ticket trovato.</p>
        ) : (
          <table className="richieste-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Titolo</th>
                <th>Descrizione</th>
                <th>Data Creazione</th>
                <th>Ordine ID</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t, index) => (
                <tr key={index}>
                  <td>{t.id}</td>
                  <td>{t.titolo}</td>
                  <td>{t.descrizione}</td>
                  <td>{t.dataCreazione}</td>
                  <td>{t.ordineCliente?.id ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Ticket;
