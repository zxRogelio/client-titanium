/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/useAuth";

export default function ConfirmAccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth();
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

        const accessToken = res.data.token;
        if (!accessToken) throw new Error("Token inválido");

        localStorage.setItem("token", accessToken);
        const payload = JSON.parse(atob(accessToken.split(".")[1]));

        const user = {
          id: payload.id,
          rol: payload.role,
          email: payload.email,
        };

        localStorage.setItem("user", JSON.stringify(user));
        setUser(user as any);

        alert("✅ Acceso confirmado correctamente");

        setTimeout(() => {
          if (user.rol === "cliente") navigate("/cliente", { replace: true });
          else if (user.rol === "entrenador")
            navigate("/entrenador", { replace: true });
          else if (user.rol === "admin")
            navigate("/admin", { replace: true });
          else navigate("/", { replace: true });
        }, 1000);
      } catch (err: any) {
        console.error(
          "❌ Error al confirmar acceso (frontend):",
          err.response?.data || err
        );

        const msg: string = err?.response?.data?.error || "";

        if (msg.toLowerCase().includes("expirado")) {
          alert("El enlace expiró, vuelve a iniciar sesión.");
        } else if (msg) {
          // 🔍 Muestra el mensaje real del backend para que lo veas
          alert(`Error al confirmar acceso: ${msg}`);
        } else {
          alert("El enlace es inválido o ya fue utilizado.");
        }

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
