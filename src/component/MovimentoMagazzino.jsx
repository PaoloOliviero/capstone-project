import { useState, useEffect } from "react";
import { Form, Button, FormControl, FormGroup, FormLabel, Modal } from "react-bootstrap";
import "../App.css";

function MovimentoMagazzino() {
  const [quantity, setQuantity] = useState("");
  const [data, setData] = useState("");
  const [magazzinoId, setMagazzinoId] = useState("");
  const [mezzoId, setMezzoId] = useState("");
  const [utenteId, setUtenteId] = useState("");
  const [pmId, setPmId] = useState("");
  const [storicoId, setStoricoId] = useState("");

  const [modalQuantity, setModalQuantity] = useState("");
  const [modalData, setModalData] = useState("");
  const [modalMagazzinoId, setModalMagazzinoId] = useState("");
  const [modalProdottoMagazzinoId, setModalProdottoMagazzinoId] = useState("");
  const [modalUtenteId, setModalUtenteId] = useState("");

  const [movimenti, setMovimenti] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setModalQuantity("");
    setModalData("");
    setModalMagazzinoId("");
    setModalProdottoMagazzinoId("");
    setModalUtenteId("");
  };

  const fetchMovimenti = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (Array.isArray(data)) {
        setMovimenti(data);
      } else if (Array.isArray(data.content)) {
        setMovimenti(data.content);
      } else {
        setMovimenti([]);
      }
    } catch {
      alert("Errore di rete o server.");
    }
  };

  const handleSearch = () => {
    let url = "http://localhost:8084/movimenti";

    if (quantity) {
      url += `/filtra/quantita?minQuantity=${quantity}`;
    } else if (data) {
      url += `/filtra/data-registrazione?data=${data}`;
    } else if (magazzinoId) {
      url += `/filtra/magazzino/${magazzinoId}`;
    } else if (mezzoId) {
      url += `/filtra/mezzo/${mezzoId}`;
    } else if (utenteId) {
      url += `/filtra/utente/${utenteId}`;
    } else if (pmId) {
      url += `/filtra/prodotto-magazzino/${pmId}`;
    } else if (storicoId) {
      url += `/filtra/storico/${storicoId}`;
    }

    fetchMovimenti(url);
  };

  const handleCreate = async () => {
    if (!modalQuantity || !modalData || !modalMagazzinoId || !modalProdottoMagazzinoId || !modalUtenteId) {
      alert("Compila tutti i campi obbligatori.");
      return;
    }

    const payload = {
      quantity: parseFloat(modalQuantity),
      dataRegistrazione: modalData,
      magazzinoId: parseInt(modalMagazzinoId),
      prodottoMagazzinoId: parseInt(modalProdottoMagazzinoId),
      utenteId: parseInt(modalUtenteId),
    };

    try {
      const response = await fetch("http://localhost:8084/movimenti/creamovimento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await fetchMovimenti("http://localhost:8084/movimenti");
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
    fetchMovimenti("http://localhost:8084/movimenti");
  }, []);

  return (
    <div className="page-wrapper">
      <Form>
        <div className="form-container">
          <FormGroup className="form-group-stretto">
            <FormLabel>Quantità minima</FormLabel>
            <FormControl type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </FormGroup>
          <FormGroup className="form-group-stretto">
            <FormLabel>Data registrazione</FormLabel>
            <FormControl type="date" value={data} onChange={(e) => setData(e.target.value)} />
          </FormGroup>
          <FormGroup className="form-group-stretto">
            <FormLabel>Magazzino ID</FormLabel>
            <FormControl type="number" value={magazzinoId} onChange={(e) => setMagazzinoId(e.target.value)} />
          </FormGroup>
          <FormGroup className="form-group-stretto">
            <FormLabel>Mezzo ID</FormLabel>
            <FormControl type="number" value={mezzoId} onChange={(e) => setMezzoId(e.target.value)} />
          </FormGroup>
          <FormGroup className="form-group-stretto">
            <FormLabel>Utente ID</FormLabel>
            <FormControl type="number" value={utenteId} onChange={(e) => setUtenteId(e.target.value)} />
          </FormGroup>
          <FormGroup className="form-group-stretto">
            <FormLabel>Prodotto Magazzino ID</FormLabel>
            <FormControl type="number" value={pmId} onChange={(e) => setPmId(e.target.value)} />
          </FormGroup>
          <FormGroup className="form-group-stretto">
            <FormLabel>Storico Percorrenza ID</FormLabel>
            <FormControl type="number" value={storicoId} onChange={(e) => setStoricoId(e.target.value)} />
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
          <Modal.Title>Crea Movimento Magazzino</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup className="mb-3">
              <FormLabel>Quantità</FormLabel>
              <FormControl type="number" value={modalQuantity} onChange={(e) => setModalQuantity(e.target.value)} />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Data registrazione</FormLabel>
              <FormControl type="date" value={modalData} onChange={(e) => setModalData(e.target.value)} />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Magazzino ID</FormLabel>
              <FormControl type="number" value={modalMagazzinoId} onChange={(e) => setModalMagazzinoId(e.target.value)} />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Prodotto Magazzino ID</FormLabel>
              <FormControl type="number" value={modalProdottoMagazzinoId} onChange={(e) => setModalProdottoMagazzinoId(e.target.value)} />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Utente ID</FormLabel>
              <FormControl type="number" value={modalUtenteId} onChange={(e) => setModalUtenteId(e.target.value)} />
            </FormGroup>
            <Button variant="success" onClick={handleCreate}>
              Invia
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <div className="ordine-tabella mt-4">
        {Array.isArray(movimenti) && movimenti.length === 0 ? (
          <p>Nessun movimento trovato.</p>
        ) : (
          <table className="richieste-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Quantità</th>
                <th>Data</th>
                <th>Magazzino</th>
                <th>Prodotto Magazzino</th>
                <th>Utente</th>
              </tr>
            </thead>
            <tbody>
              {movimenti.map((m, index) => (
                <tr key={index}>
                  <td>{m.Id}</td>
                  <td>{m.quantity}</td>
                  <td>{m.dataRegistrazione}</td>
                  <td>{"MG-1" + m.magazzinoId}</td>
                  <td>{"PM-1" + m.prodottoMagazzinoId}</td>
                  <td>
                    {m.registratoDa} ({"ID" + m.utenteId})
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

export default MovimentoMagazzino;
