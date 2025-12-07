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

  // 🔍 Chequeos en tiempo real de la contraseña
  const lengthOk = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[\W_]/.test(password);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  // helper para la clase de cada regla
  const ruleClass = (ok: boolean) =>
    "password-rule " + (ok ? "password-rule-ok" : "password-rule-bad");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateEmail(email)) {
      setErrorMessage("Correo no válido");
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "La contraseña debe tener al menos 8 caracteres e incluir una mayúscula, una minúscula, un número y un símbolo"
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
        role: "cliente",
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

                {/* Email */}
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

                {/* Contraseña */}
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

                  {/* ✅ Checklist en tiempo real */}
                  <ul className="password-rules-list">
                    <li className={ruleClass(lengthOk)}>
                      {lengthOk ? "✔" : "•"} Mínimo 8 caracteres
                    </li>
                    <li className={ruleClass(hasUpper)}>
                      {hasUpper ? "✔" : "•"} Al menos una letra mayúscula
                    </li>
                    <li className={ruleClass(hasLower)}>
                      {hasLower ? "✔" : "•"} Al menos una letra minúscula
                    </li>
                    <li className={ruleClass(hasNumber)}>
                      {hasNumber ? "✔" : "•"} Al menos un número
                    </li>
                    <li className={ruleClass(hasSymbol)}>
                      {hasSymbol ? "✔" : "•"} Al menos un símbolo
                    </li>
                  </ul>
                </div>

                {/* Confirmar contraseña */}
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

                  {/* Opcional: mensaje de coincidencia */}
                  {confirmPassword.length > 0 && (
                    <p
                      className={
                        password === confirmPassword
                          ? "password-match-ok"
                          : "password-match-bad"
                      }
                    >
                      {password === confirmPassword
                        ? "✅ Las contraseñas coinciden"
                        : "⚠️ Las contraseñas aún no coinciden"}
                    </p>
                  )}
                </div>

                {/* Términos */}
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
