import { useState, useEffect } from "react";
import { Form, Button, FormControl, FormGroup, FormLabel, Modal } from "react-bootstrap";
import "./OrdiniClienti.css";

function OrdiniClienti() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [id, setId] = useState("");
  const [dataOrdine, setDataOrdine] = useState("");
  const [statoOrdine, setStatoOrdine] = useState("");
  const [ragioneSociale, setRagioneSociale] = useState("");
  const [importoFattura, setImportoFattura] = useState("");
  const [segmentoId, setSegmentoId] = useState("");

  const [modalOrdineId, setModalOrdineId] = useState("");
  const [modalSegmentoId, setModalSegmentoId] = useState("");

  const [ordini, setOrdini] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setModalOrdineId("");
    setModalSegmentoId("");
  };

  const fetchOrdini = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setOrdini(Array.isArray(data) ? data : []);
    } catch {
      alert("Errore di rete o server.");
    }
  };

  const handleSearch = () => {
    let url = "http://localhost:8084/ordinicliente/con-relazioni";

    const params = [];
    if (id) params.push(`id=${id}`);
    if (dataOrdine) params.push(`dataOrdine=${dataOrdine}`);
    if (statoOrdine) params.push(`statoOrdine=${statoOrdine}`);
    if (ragioneSociale) params.push(`ragioneSociale=${ragioneSociale}`);
    if (importoFattura) params.push(`importoFattura=${importoFattura}`);
    if (segmentoId) params.push(`segmentoId=${segmentoId}`);

    if (params.length > 0) {
      url += "?" + params.join("&");
    }

    fetchOrdini(url);
  };

  const handleAssegnaSegmento = async () => {
    if (!modalOrdineId || !modalSegmentoId) {
      alert("Compila entrambi i campi.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:8084/ordinicliente/${modalOrdineId}/classifica?segmentoId=${modalSegmentoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchOrdini("http://localhost:8084/ordinicliente/con-relazioni");
        handleCloseModal();
      } else {
        const errorText = await response.text();
        alert("Errore nell'assegnazione: " + errorText);
      }
    } catch {
      alert("Errore di rete o server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchOrdini("http://localhost:8084/ordinicliente/con-relazioni");
  }, []);

  return (
    <div className="ordini-wrapper">
      <Form>
        <div className="ordini-form-container">
          <FormGroup className="ordini-form-group">
            <FormLabel>ID Ordine</FormLabel>
            <FormControl type="number" value={id} onChange={(e) => setId(e.target.value)} />
          </FormGroup>
          <FormGroup className="ordini-form-group">
            <FormLabel>Data Ordine</FormLabel>
            <FormControl type="date" value={dataOrdine} onChange={(e) => setDataOrdine(e.target.value)} />
          </FormGroup>
          <FormGroup className="ordini-form-group">
            <FormLabel>Stato Ordine</FormLabel>
            <FormControl type="text" value={statoOrdine} onChange={(e) => setStatoOrdine(e.target.value)} />
          </FormGroup>
          <FormGroup className="ordini-form-group">
            <FormLabel>Ragione Sociale</FormLabel>
            <FormControl type="text" value={ragioneSociale} onChange={(e) => setRagioneSociale(e.target.value)} />
          </FormGroup>
          <FormGroup className="ordini-form-group">
            <FormLabel>Importo Fattura</FormLabel>
            <FormControl type="number" value={importoFattura} onChange={(e) => setImportoFattura(e.target.value)} />
          </FormGroup>
          <FormGroup className="ordini-form-group">
            <FormLabel>Segmento ID</FormLabel>
            <FormControl type="number" value={segmentoId} onChange={(e) => setSegmentoId(e.target.value)} />
          </FormGroup>
          <Button className="ordini-bottone" onClick={handleSearch}>
            Cerca
          </Button>
          <Button className="ordini-bottone" variant="warning" onClick={handleOpenModal}>
            Assegna Segmento
          </Button>
        </div>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Assegna Segmento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup className="ordini-form-group">
              <FormLabel>Ordine ID</FormLabel>
              <FormControl type="number" value={modalOrdineId} onChange={(e) => setModalOrdineId(e.target.value)} />
            </FormGroup>
            <FormGroup className="ordini-form-group">
              <FormLabel>Segmento ID</FormLabel>
              <FormControl type="number" value={modalSegmentoId} onChange={(e) => setModalSegmentoId(e.target.value)} />
            </FormGroup>
            <Button className="ordini-bottone" variant="success" onClick={handleAssegnaSegmento} disabled={isSubmitting}>
              Invia
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <div className="ordini-tabella">
        {ordini.length === 0 ? (
          <p>Nessun ordine trovato.</p>
        ) : (
          <table className="ordini-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Data Ordine</th>
                <th>Stato</th>
                <th>Ragione Sociale</th>
                <th>Importo Fattura</th>
                <th>Segmento ID</th>
              </tr>
            </thead>
            <tbody>
              {ordini.map((o, index) => (
                <tr key={index}>
                  <td>{o.id}</td>
                  <td>{o.dataOrdine}</td>
                  <td>{o.statoOrdine}</td>
                  <td>{o.ragioneSociale ?? "—"}</td>
                  <td>{o.importoFattura ?? "—"}</td>
                  <td>{o.segmentoId ?? "—"}</td>
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
