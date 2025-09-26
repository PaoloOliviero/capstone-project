import { useState, useEffect } from "react";
import { Form, Button, FormControl, FormGroup, FormLabel, Modal } from "react-bootstrap";
import "../App.css";

function RichiesteProdotto() {
  const [quantitaRichiesta, setQuantitaRichiesta] = useState("");
  const [dataRichiesta, setDataRichiesta] = useState("");
  const [motivazione, setMotivazione] = useState("");
  const [prodottoMagazzinoId, setProdottoMagazzinoId] = useState("");
  const [magazzinoId, setMagazzinoId] = useState("");
  const [richiestoDaId, setRichiestoDaId] = useState("");

  const [modalQuantita, setModalQuantita] = useState("");
  const [modalData, setModalData] = useState("");
  const [modalMotivazione, setModalMotivazione] = useState("");
  const [modalProdottoMagazzinoId, setModalProdottoMagazzinoId] = useState("");
  const [modalMagazzinoId, setModalMagazzinoId] = useState("");
  const [modalRichiestoDaId, setModalRichiestoDaId] = useState("");

  const [richieste, setRichieste] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setModalQuantita("");
    setModalData("");
    setModalMotivazione("");
    setModalProdottoMagazzinoId("");
    setModalMagazzinoId("");
    setModalRichiestoDaId("");
  };

  const fetchRichieste = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (Array.isArray(data)) {
        setRichieste(data);
      } else if (Array.isArray(data.content)) {
        setRichieste(data.content);
      } else {
        setRichieste([]);
      }
    } catch {
      alert("Errore di rete o server.");
    }
  };

  const handleSearch = () => {
    let url = "http://localhost:8084/richieste-prodotti";

    if (quantitaRichiesta) {
      url += `/filtroquantita?quantitaRichiesta=${quantitaRichiesta}`;
    } else if (dataRichiesta) {
      url += `/filtrodata?dataRichiesta=${dataRichiesta}`;
    } else if (motivazione) {
      url += `/filtromotivazione?motivazione=${motivazione}`;
    } else if (prodottoMagazzinoId) {
      url += `/filtroprodotto?prodottoMagazzinoId=${prodottoMagazzinoId}`;
    } else if (magazzinoId) {
      url += `/filtromagazzino?magazzinoId=${magazzinoId}`;
    } else if (richiestoDaId) {
      url += `/filtroutente?richiestoDaId=${richiestoDaId}`;
    }

    fetchRichieste(url);
  };

  const handleCreateRequest = async () => {
    if (
      !modalQuantita ||
      !modalData ||
      !modalMotivazione ||
      !modalProdottoMagazzinoId ||
      !modalMagazzinoId ||
      !modalRichiestoDaId ||
      parseInt(modalQuantita) < 1
    ) {
      alert("Compila tutti i campi obbligatori con valori validi.");
      return;
    }

    const payload = {
      quantitaRichiesta: parseInt(modalQuantita),
      dataRichiesta: modalData,
      motivazione: modalMotivazione,
      prodottoMagazzinoId: parseInt(modalProdottoMagazzinoId),
      magazzinoId: parseInt(modalMagazzinoId),
      richiestoDaId: parseInt(modalRichiestoDaId),
    };

    try {
      const response = await fetch("http://localhost:8084/richieste-prodotti/creamanuale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setQuantitaRichiesta("");
        setDataRichiesta("");
        setMotivazione("");
        setProdottoMagazzinoId("");
        setMagazzinoId("");
        setRichiestoDaId("");
        await fetchRichieste("http://localhost:8084/richieste-prodotti");
        handleCloseModal();
      } else {
        const errorText = await response.text();
        alert("Errore nella creazione: " + errorText);
      }
    } catch {
      alert("Errore di rete o server.");
    }
  };

  useEffect(() => {
    fetchRichieste("http://localhost:8084/richieste-prodotti");
  }, []);

  return (
    <div className="page-wrapper">
      <Form>
        <div className="form-container">
          <FormGroup className="form-group-stretto">
            <FormLabel>Quantità</FormLabel>
            <FormControl type="number" value={quantitaRichiesta} onChange={(e) => setQuantitaRichiesta(e.target.value)} />
          </FormGroup>
          <FormGroup className="form-group-stretto">
            <FormLabel>Data</FormLabel>
            <FormControl type="date" value={dataRichiesta} onChange={(e) => setDataRichiesta(e.target.value)} />
          </FormGroup>
          <FormGroup className="form-group-stretto">
            <FormLabel>Motivazione</FormLabel>
            <FormControl type="text" value={motivazione} onChange={(e) => setMotivazione(e.target.value)} />
          </FormGroup>
          <FormGroup className="form-group-stretto">
            <FormLabel>Prodotto Magazzino ID</FormLabel>
            <FormControl type="number" value={prodottoMagazzinoId} onChange={(e) => setProdottoMagazzinoId(e.target.value)} />
          </FormGroup>
          <FormGroup className="form-group-stretto">
            <FormLabel>Magazzino ID</FormLabel>
            <FormControl type="number" value={magazzinoId} onChange={(e) => setMagazzinoId(e.target.value)} />
          </FormGroup>
          <FormGroup className="form-group-stretto">
            <FormLabel>Utente ID</FormLabel>
            <FormControl type="number" value={richiestoDaId} onChange={(e) => setRichiestoDaId(e.target.value)} />
          </FormGroup>
          <Button variant="primary" className="bottone-stretto" onClick={handleSearch}>
            Cerca
          </Button>
          <Button variant="danger" className="bottone-stretto" onClick={handleOpenModal}>
            Crea
          </Button>
        </div>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Crea Richiesta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup className="mb-3">
              <FormLabel>Quantità</FormLabel>
              <FormControl type="number" value={modalQuantita} onChange={(e) => setModalQuantita(e.target.value)} />
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>Data</FormLabel>
              <FormControl type="date" value={modalData} onChange={(e) => setModalData(e.target.value)} />
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>Motivazione</FormLabel>
              <FormControl type="text" value={modalMotivazione} onChange={(e) => setModalMotivazione(e.target.value)} />
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>Prodotto Magazzino ID</FormLabel>
              <FormControl type="number" value={modalProdottoMagazzinoId} onChange={(e) => setModalProdottoMagazzinoId(e.target.value)} />
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>Magazzino ID</FormLabel>
              <FormControl type="number" value={modalMagazzinoId} onChange={(e) => setModalMagazzinoId(e.target.value)} />
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>Utente ID</FormLabel>
              <FormControl type="number" value={modalRichiestoDaId} onChange={(e) => setModalRichiestoDaId(e.target.value)} />
            </FormGroup>

            <Button variant="success" onClick={handleCreateRequest}>
              Invia
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <div className="ordine-tabella mt-4">
        {Array.isArray(richieste) && richieste.length === 0 ? (
          <p>Nessuna richiesta trovata.</p>
        ) : (
          <table className="richieste-table">
            <thead>
              <tr>
                <th>Quantità</th>
                <th>Data</th>
                <th>Motivazione</th>
                <th>Prodotto Magazzino</th>
                <th>Magazzino</th>
                <th>Utente ID</th>
              </tr>
            </thead>
            <tbody>
              {richieste.map((r, index) => (
                <tr key={index}>
                  <td>{r.quantitaRichiesta}</td>
                  <td>{r.dataRichiesta}</td>
                  <td>{r.motivazione}</td>
                  <td>{"PM-" + r.prodottoMagazzinoId}</td>
                  <td>{"MG-" + r.magazzinoId}</td>
                  <td>{"ID-" + r.richiestoDaId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default RichiesteProdotto;
