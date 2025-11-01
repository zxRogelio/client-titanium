// src/pages/ConfiguracionPage.tsx
import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { API } from "../api/api";
import "../styles/configuracion.css"; 
export default function ConfiguracionPage() {
  const [selectedMethod, setSelectedMethod] = useState("normal");
  const [qr, setQR] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.email) {
      setEmail(user.email);
      fetchCurrentMethod();
    }
  }, []);

  const fetchCurrentMethod = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.authMethod) {
        setSelectedMethod(res.data.authMethod);
      }
    } catch (err) {
      console.error("Error al obtener método actual:", err);
    }
  };

  const handleUpdateMethod = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.patch(
        "/user/update-auth-method",
        { authMethod: selectedMethod },
        { headers: { Authorization: `Bearer ${token}` } }
      );
            if (selectedMethod === "totp") {
            const res = await API.post("/auth/generate-totp", { email });
            const qrImage = await QRCode.toDataURL(res.data.otpauth_url); 
            setQR(qrImage);
            } else {
            setQR(null);
            }


      alert("Método actualizado correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar método");
    }
  };

  return (
    <div className="config-container">
      <h2>Configurar Verificación en Dos Pasos</h2>

      <div className="config-options">
        <label>
          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
          >
            <option value="normal">🔓 Solo contraseña</option>
            <option value="otp">📩 Código por correo</option>
            <option value="confirm-link">🔐 ¿Eres tú? por link</option>
            <option value="totp">📱 TOTP con QR</option>
          </select>
        </label>
      </div>

      <button className="btn-disable" onClick={handleUpdateMethod}>
        Guardar método
      </button>

      {selectedMethod === "totp" && qr && (
        <div className="qr-container">
          <p>Escanea este código QR en Google Authenticator:</p>
          <img src={qr} alt="QR Code" />
        </div>
      )}
    </div>
  );
}
