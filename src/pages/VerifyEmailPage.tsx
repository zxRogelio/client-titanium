import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { API } from "../api/api";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verificando tu cuenta...");
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("Token no proporcionado.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await API.post("/auth/verify-email", { token });

        if (res.status === 200) {
          setStatus("✅ Tu cuenta ha sido verificada con éxito. Redirigiendo...");
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setStatus("❌ No se pudo verificar tu cuenta.");
        }
      } catch (error) {
        console.error("Error al verificar correo:", error);
        setStatus("❌ Token inválido o expirado.");
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="auth-layout">
      <main className="auth-main">
        <div className="auth-page">
          <h1 className="auth-title">Verificación de correo</h1>
          <p className="auth-subtitle">{status}</p>
        </div>
      </main>
    </div>
  );
}
