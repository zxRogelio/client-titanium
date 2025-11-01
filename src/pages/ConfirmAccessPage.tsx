import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/useAuth"; // 🟢 Importa el contexto

export default function ConfirmAccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth(); // 🟢 Contexto global
  const token = new URLSearchParams(location.search).get("token");

  useEffect(() => {
    const confirmarAcceso = async () => {
      if (!token) {
        alert("Token inválido");
        navigate("/login", { replace: true });
        return;
      }

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/confirm-access`,
          { token }
        );

        const { token: accessToken } = res.data;
        if (!accessToken) throw new Error("Token inválido");

        localStorage.setItem("token", accessToken);
        const payload = JSON.parse(atob(accessToken.split(".")[1]));

        const user = {
          id: payload.id,
          rol: payload.role,
          email: payload.email,
        };

        localStorage.setItem("user", JSON.stringify(user));
        setUser(user); // 🟢 Actualiza el contexto

        alert("✅ Acceso confirmado correctamente");

        setTimeout(() => {
          if (user.rol === "cliente") navigate("/cliente", { replace: true });
          else if (user.rol === "entrenador") navigate("/entrenador", { replace: true });
          else if (user.rol === "admin") navigate("/admin", { replace: true });
          else navigate("/", { replace: true });
        }, 1000);
      } catch (err) {
        console.error("❌ Error al confirmar acceso:", err);
        alert("El enlace expiró o es inválido");
        navigate("/login", { replace: true });
      }
    };

    confirmarAcceso();
  }, [token, navigate, setUser]);

  return (
    <div style={{ padding: "3rem", textAlign: "center" }}>
      <h2>Verificando acceso...</h2>
      <div
        className="spinner"
        style={{
          marginTop: "2rem",
          width: "40px",
          height: "40px",
          border: "5px solid #ccc",
          borderTop: "5px solid #4CAF50",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          margin: "auto",
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
