import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ConfirmAccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
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

        // 🟢 Guardar el token en localStorage
        localStorage.setItem("token", accessToken);

        // Decodificar JWT
        const payload = JSON.parse(atob(accessToken.split(".")[1]));

        const user = {
          id: payload.id,
          role: payload.role,
          email: payload.email,
        };

        localStorage.setItem("user", JSON.stringify(user));

        alert("✅ Acceso confirmado correctamente");

        // 🟢 Redirigir según el rol
        setTimeout(() => {
          if (user.role === "cliente") navigate("/cliente", { replace: true });
          else if (user.role === "entrenador") navigate("/entrenador", { replace: true });
          else if (user.role === "admin") navigate("/admin", { replace: true });
          else navigate("/", { replace: true });
        }, 1000);
      } catch (err) {
        console.error("❌ Error al confirmar acceso:", err);
        alert("El enlace expiró o es inválido");
        navigate("/login", { replace: true });
      }
    };

    confirmarAcceso();
  }, [token, navigate]);

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
