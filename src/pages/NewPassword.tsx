/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api/api";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function NewPassword() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const email = location.state?.email;
  const otp = location.state?.otp;

  const onSubmit = async (data: any) => {
    try {
      await API.post("/auth/reset-password", {
        email,
        otp,
        newPassword: data.password,
      });

      alert("Contraseña actualizada correctamente");
      navigate("/login");
    } catch (err: any) {
      console.error("Error al cambiar contraseña:", err.response?.data || err);
      alert("Error al cambiar contraseña");
    }
  };

  return (
    <main className="auth-page">
      {/* Sección izquierda con imagen */}
      <section className="auth-image-section">
        <div className="auth-image-overlay">
          <h1 className="auth-image-title">RECUPERA TU CUENTA</h1>
          <p className="auth-image-subtitle">Ingresa una nueva contraseña segura y vuelve a entrenar con nosotros.</p>
        </div>
      </section>

      {/* Sección derecha con formulario */}
      <section className="auth-form-section">
        <div className="auth-form-container">
          <h2 className="auth-title">Nueva Contraseña</h2>
          <p className="auth-subtitle">Introduce una contraseña nueva para acceder a tu cuenta Titanium Sport Gym</p>

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="auth-input-group">
              <label className="auth-label" htmlFor="password">Nueva contraseña</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">
                  <Eye className="auth-icon" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="auth-input"
                  placeholder="********"
                  {...register("password", { required: true })}
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-btn-primary">
              Cambiar Contraseña
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
