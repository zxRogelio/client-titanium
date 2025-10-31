 
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../api/api"; // ✅ Usa tu constante API
import "../styles/auth.css";
import { useNavigate } from "react-router-dom";


export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [, setScrolled] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRegister = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
    await API.post("/auth/register", {
  email,
  password,
});

      alert("Registro exitoso. Revisa tu correo para confirmar tu cuenta.");
      navigate("/login");
    } catch (err) {
      console.error("Error al registrar:", err);
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.error || err.message || "Error al registrar");
      } else {
        alert("Error inesperado al registrar");
      }
    }
  };

  return (
    <div className="auth-layout">
      <main className="auth-main">
        <div className="auth-page">
          <div className="auth-image-section">
            <div className="auth-image-overlay">
              <h1 className="auth-image-title"></h1>
              <p className="auth-image-subtitle"></p>
            </div>
          </div>

          <div className="auth-form-section">
            <div className="auth-form-container">
              <h1 className="auth-title">Crear Cuenta</h1>
              <p className="auth-subtitle">
                Regístrate en Titanium Sport Gym y comienza tu transformación
              </p>

              <form className="auth-form" onSubmit={handleRegister}>
                {/* Email */}
                <div className="auth-input-group">
                  <label className="auth-label" htmlFor="email">
                    Correo Electrónico
                  </label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon" aria-hidden>
                      <svg viewBox="0 0 24 24" className="auth-icon">
                        <path d="M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2zm0 2l8 5 8-5"
                          fill="none" stroke="currentColor" strokeWidth="1.8"
                          strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="auth-input"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="auth-input-group">
                  <label className="auth-label" htmlFor="password">
                    Contraseña
                  </label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon" aria-hidden>
                      <svg viewBox="0 0 24 24" className="auth-icon">
                        <path d="M7 10V8a5 5 0 1110 0v2"
                          fill="none" stroke="currentColor" strokeWidth="1.8"
                          strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="5" y="10" width="14" height="10" rx="2"
                          fill="none" stroke="currentColor" strokeWidth="1.8" />
                      </svg>
                    </span>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="auth-input"
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="auth-eye-btn"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {/* Icono de ojo oculto o visible */}
                      {showPassword ? (
                        <svg viewBox="0 0 24 24" className="auth-icon">
                          <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M10.58 10.58A2 2 0 0012 14a2 2 0 001.42-.58" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" className="auth-icon">
                          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="auth-input-group">
                  <label className="auth-label" htmlFor="confirm-password">
                    Confirmar Contraseña
                  </label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon" aria-hidden>
                      <svg viewBox="0 0 24 24" className="auth-icon">
                        <path d="M7 10V8a5 5 0 1110 0v2"
                          fill="none" stroke="currentColor" strokeWidth="1.8"
                          strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="5" y="10" width="14" height="10" rx="2"
                          fill="none" stroke="currentColor" strokeWidth="1.8" />
                      </svg>
                    </span>
                    <input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="auth-input"
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="auth-eye-btn"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {/* Icono ojo igual que el de arriba */}
                      {showConfirmPassword ? (
                        <svg viewBox="0 0 24 24" className="auth-icon">
                          <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M10.58 10.58A2 2 0 0012 14a2 2 0 001.42-.58" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" className="auth-icon">
                          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Términos */}
                <div className="auth-row">
                  <label className="auth-remember">
                    <input type="checkbox" required />
                    <span>
                      Acepto los <a href="#" className="auth-link">términos y condiciones</a>
                    </span>
                  </label>
                </div>

                <button type="submit" className="auth-btn-primary">
                  Crear Cuenta
                </button>

                <p className="auth-footer">
                  ¿Ya tienes una cuenta?{" "}
                  <Link to="/login" className="auth-link-strong">Inicia sesión aquí</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
