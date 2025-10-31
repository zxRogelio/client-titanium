/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API } from "../api/api";

export default function ForgotPasswordPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await API.post("/auth/forgot-password", {
        email: data.email,
      });
      navigate("/verify-reset", { state: { email: data.email } });
    } catch (err: any) {
      console.error("Error al enviar OTP:", err.response?.data || err);
      alert("Error al enviar código al correo");
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-image-section">
        <div className="auth-image-overlay">
          <h1 className="auth-image-title">¿OLVIDASTE TU CONTRASEÑA?</h1>
          <p className="auth-image-subtitle">Recupera el acceso a tu cuenta Titanium Sport Gym fácilmente.</p>
        </div>
      </section>

      <section className="auth-form-section">
        <div className="auth-form-container">
          <h2 className="auth-title">Recuperar Contraseña</h2>
          <p className="auth-subtitle">Ingresa tu correo electrónico y te enviaremos un código</p>

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="auth-input-group">
              <label className="auth-label" htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                className="auth-input"
                placeholder="correo@titaniumgym.com"
                {...register("email", { required: true })}
              />
            </div>
            <button type="submit" className="auth-btn-primary">
              Enviar código
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
