// src/pages/RegisterPage.tsx
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

  // ✅ Estado para checklist dinámico de contraseña
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    symbol: false,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // 🔐 Misma política que backend: 8+ chars, mayúscula, minúscula, número y símbolo
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  // ✅ Cada vez que cambie la contraseña, actualizamos el checklist
  const handlePasswordChange = (value: string) => {
    setPassword(value);

    setPasswordChecks({
      length: value.length >= 8,
      upper: /[A-Z]/.test(value),
      lower: /[a-z]/.test(value),
      number: /\d/.test(value),
      symbol: /[\W_]/.test(value),
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateEmail(email)) {
      setErrorMessage("Correo no válido");
      return;
    }

    if (!passwordRegex.test(password)) {
      // ❗ AHORA SE MUESTRA COMO ALERTA, NO COMO TEXTO ABAJO
      alert(
        "La contraseña debe tener al menos 8 caracteres e incluir una mayúscula, una minúscula, un número y un símbolo."
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

  // 🔧 Función auxiliar para pintar el checklist
  const renderCheckItem = (ok: boolean, text: string) => (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "13px",
        color: ok ? "#16a34a" : "#777",
      }}
    >
      <span
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: ok ? "#16a34a" : "#ccc",
          display: "inline-block",
        }}
      />
      <span>{text}</span>
    </li>
  );

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

                {/* Correo */}
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
                      onChange={(e) => handlePasswordChange(e.target.value)}
                    />
                    <button
                      type="button"
                      className="auth-eye-btn"
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>

                  {/* ✅ Checklist dinámico de requisitos */}
                  <ul
                    style={{
                      listStyle: "none",
                      paddingLeft: 0,
                      marginTop: "8px",
                    }}
                  >
                    {renderCheckItem(
                      passwordChecks.length,
                      "Al menos 8 caracteres"
                    )}
                    {renderCheckItem(
                      passwordChecks.upper,
                      "Contiene una letra mayúscula"
                    )}
                    {renderCheckItem(
                      passwordChecks.lower,
                      "Contiene una letra minúscula"
                    )}
                    {renderCheckItem(
                      passwordChecks.number,
                      "Contiene un número"
                    )}
                    {renderCheckItem(
                      passwordChecks.symbol,
                      "Contiene un símbolo (ej. !, $, #, ?)"
                    )}
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
                      onClick={() =>
                        setShowConfirmPassword((v) => !v)
                      }
                    >
                      {showConfirmPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                {/* Términos y condiciones */}
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
                      <Link
                        to="/terms"
                        className="auth-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        términos y condiciones
                      </Link>
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
