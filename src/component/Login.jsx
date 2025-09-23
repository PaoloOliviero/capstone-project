import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8084/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setMessaggio("Credenziali non valide");
        return;
      }

      const data = await res.json();

      localStorage.setItem("token", data.accessToken);

      setMessaggio("Login riuscito!");
      navigate("/richieste");
    } catch (error) {
      console.error("Errore nel login:", error);
      setMessaggio("Errore di rete o server.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ width: "300px", textAlign: "center" }}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <button onClick={handleLogin} style={{ width: "100%", padding: "8px" }}>
          Accedi
        </button>
        <p>{messaggio}</p>
      </div>
    </div>
  );
}

export default Login;
