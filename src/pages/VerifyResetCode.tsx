/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api/api";

export default function VerifyResetCodePage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const onSubmit = async (data: any) => {
    try {
      await API.post("/auth/verify-reset-otp", {
        email,
        otp: data.otp,
      });
      navigate("/new-password", { state: { email, otp: data.otp } });
    } catch (err: any) {
      console.error("Error al verificar OTP:", err.response?.data || err);
      alert("Código inválido o expirado");
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-image-section">
        <div className="auth-image-overlay">
          <h1 className="auth-image-title">VERIFICACIÓN</h1>
          <p className="auth-image-subtitle">Escribe el código de 6 dígitos que enviamos a tu correo</p>
        </div>
      </section>

      <section className="auth-form-section">
        <div className="auth-form-container">
          <h2 className="auth-title">Código de Verificación</h2>
          <p className="auth-subtitle">Verifica tu identidad para continuar con el cambio de contraseña</p>

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="auth-input-group">
              <label className="auth-label" htmlFor="otp">Código de 6 dígitos</label>
              <input
                type="text"
                className="auth-input"
                placeholder="123456"
                maxLength={6}
                {...register("otp", { required: true })}
              />
            </div>
            <button type="submit" className="auth-btn-primary">
              Verificar código
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
