/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/VerificarOTP.tsx
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { API } from "../api/api";
import { useAuth } from "../context/useAuth"; // 🟢 Importa el contexto

export default function VerificarOTP() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth(); // 🟢 Contexto global
  const [searchParams] = useSearchParams();

  // 🟣 Email puede venir del state (login normal) o de la query (?email=...&oauth=1)
  const emailFromState = (location.state as any)?.email;
  const emailFromQuery = searchParams.get("email");
  const email = emailFromState || emailFromQuery || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      alert("No se detectó el correo del usuario. Intenta iniciar sesión de nuevo.");
      setLoading(false);
      navigate("/login");
      return;
    }

    try {
      const res = await API.post("/auth/verify-otp", { email, otp });

      const { accessToken, user } = res.data;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user); // 🟢 Actualiza el contexto

      switch (user.rol) {
        case "cliente":
          navigate("/cliente");
          break;
        case "entrenador":
          navigate("/entrenador");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      console.error("❌ Error verificando OTP:", err);
      alert("Código incorrecto o expirado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, white, #FFF9E6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px 30px",
          borderRadius: "15px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            fontSize: "22px",
            color: "#333",
          }}
        >
          Verificación por Código (OTP)
        </h2>

        {/* Opcionalmente mostramos a qué correo se envió */}
        {email && (
          <p style={{ textAlign: "center", marginBottom: "10px", fontSize: "14px", color: "#555" }}>
            Se envió un código a: <strong>{email}</strong>
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label
            style={{ marginBottom: "8px", fontSize: "15px", color: "#333" }}
          >
            Ingresa el código que recibiste por correo:
          </label>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={{
              padding: "10px",
              fontSize: "16px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#EC5DBB",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
          >
            {loading ? "Verificando..." : "Verificar"}
          </button>
        </form>
      </div>
    </div>
  );
}
