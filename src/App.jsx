import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyNav from "./component/MyNav";
import ProdottoMagazzino from "./component/ProdottoMagazzino";
import Login from "./component/Login";
import Carico from "./component/Carico";
import RichiesteProdotto from "./component/Richiesteprodotto";
import MovimentoMagazzino from "./component/MovimentoMagazzino";
import StoricoPercorrenze from "./component/StoricoPercorso";
import Commerciale from "./component/Commerciale";

function LayoutConSidebar() {
  return (
    <>
      <MyNav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/magazzino" element={<ProdottoMagazzino />} />
        <Route path="/richieste" element={<RichiesteProdotto />} />
        <Route path="/carichi" element={<Carico />} />
        <Route path="/movimenti" element={<MovimentoMagazzino />} />
        <Route path="/storico" element={<StoricoPercorrenze />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Pagina commerciale con navbar dedicata */}
        <Route path="/commerciale/*" element={<Commerciale />} />

        {/* Tutte le altre pagine con sidebar */}
        <Route path="/*" element={<LayoutConSidebar />} />
      </Routes>
    </Router>
  );
}

export default App;
