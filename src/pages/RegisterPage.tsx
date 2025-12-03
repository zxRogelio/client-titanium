import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../api/api";
import "../styles/auth.css";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [, setScrolled] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateEmail(email)) {
      setErrorMessage("Correo no válido");
      return;
    }

    // 🔐 Política alineada con el backend:
    // Mínimo 8 caracteres, mayúscula, minúscula, número y símbolo.
    if (password.length < 8) {
      setErrorMessage("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "La contraseña debe incluir al menos una mayúscula, una minúscula, un número y un símbolo"
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    if (!termsAccepted) {
      setErrorMessage("Debes aceptar los términos y condiciones");
      return;
    }

    try {
      setLoading(true);
      await API.post("/auth/register", {
        email,
        password,
        role: "cliente", // si tu backend usa 'role', aquí lo ajustas después
      });

      alert(
        "Registro exitoso. Revisa tu correo para confirmar tu cuenta."
      );
      navigate("/login");
    } catch (err) {
      console.error("Error al registrar:", err);
      if (axios.isAxiosError(err)) {
        setErrorMessage(err.response?.data?.error || err.message);
      } else {
        setErrorMessage("Error inesperado al registrar");
      }
    } finally {
      setLoading(false);
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
                Regístrate en Titanium Sport Gym y comienza tu
                transformación
              </p>

              <form className="auth-form" onSubmit={handleRegister}>
                {errorMessage && (
                  <div className="auth-error">{errorMessage}</div>
                )}

                <div className="auth-input-group">
                  <label className="auth-label" htmlFor="email">
                    Correo Electrónico
                  </label>
                  <div className="auth-input-wrap">
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

                <div className="auth-input-group">
                  <label className="auth-label" htmlFor="password">
                    Contraseña
                  </label>
                  <div className="auth-input-wrap">
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
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {/* Texto de ayuda sobre la política de contraseña */}
                  <p className="auth-help-text">
                    Mínimo 8 caracteres, con al menos una mayúscula, una
                    minúscula, un número y un símbolo.
                  </p>
                </div>

                <div className="auth-input-group">
                  <label
                    className="auth-label"
                    htmlFor="confirm-password"
                  >
                    Confirmar Contraseña
                  </label>
                  <div className="auth-input-wrap">
                    <input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="auth-input"
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                    />
                    <button
                      type="button"
                      className="auth-eye-btn"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                    >
                      {showConfirmPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <div className="auth-row">
                  <label className="auth-remember">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) =>
                        setTermsAccepted(e.target.checked)
                      }
                      required
                    />
                    <span>
                      Acepto los{" "}
                      <a href="#" className="auth-link">
                        términos y condiciones
                      </a>
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="auth-btn-primary"
                  disabled={loading}
                >
                  {loading ? "Registrando..." : "Crear Cuenta"}
                </button>

                <p className="auth-footer">
                  ¿Ya tienes una cuenta?{" "}
                  <Link to="/login" className="auth-link-strong">
                    Inicia sesión aquí
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
