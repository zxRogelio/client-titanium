/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/useAuth"; // ✅ IMPORTANTE
import "../styles/auth.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [, setScrolled] = useState(false);
  const navigate = useNavigate();

  const { setUser } = useAuth(); // ✅ Usa el contexto aquí

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password }
      );

      // Si requiere autenticación 2FA
      if (res.data.twoFactorRequired) {
        const method = res.data.method?.toLowerCase();

        if (method === "totp") {
          navigate("/login-totp", { state: { email } });
          return;
        }
        if (method === "confirm-link") {
          navigate("/esperando-confirmacion", { state: { email } });
          return;
        }
        if (method === "otp") {
          navigate("/verificar-otp", { state: { email } });
          return;
        }
      }

      // 🔹 Autenticación normal
      const { accessToken, user } = res.data;

      if (accessToken && user) {
        // Guardar en localStorage
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        // ✅ Actualizar el AuthContext
        setUser(user);

        // Redirigir según rol
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
      }
    } catch (err: any) {
      alert(err.response?.data?.error || "Error al iniciar sesión");
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
              <h1 className="auth-title">Iniciar Sesión</h1>
              <p className="auth-subtitle">
                Accede a tu cuenta de Titanium Sport Gym
              </p>

              <form className="auth-form" onSubmit={handleLogin}>
                {/* Email */}
                <div className="auth-input-group">
                  <label htmlFor="email" className="auth-label">
                    Correo Electrónico
                  </label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon">
                      <svg viewBox="0 0 24 24" className="auth-icon">
                        <path d="M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2zm0 2l8 5 8-5" />
                      </svg>
                    </span>
                    <input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="auth-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="auth-input-group">
                  <label htmlFor="password" className="auth-label">
                    Contraseña
                  </label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon">
                      <svg viewBox="0 0 24 24" className="auth-icon">
                        <path d="M7 10V8a5 5 0 1110 0v2" />
                        <rect x="5" y="10" width="14" height="10" rx="2" />
                      </svg>
                    </span>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="auth-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      className="auth-eye-btn"
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                {/* Remember + forgot */}
                <div className="auth-row">
                  <label className="auth-remember">
                    <input type="checkbox" />
                    <span>Recordarme</span>
                  </label>
                  <Link className="auth-link" to="/forgot-password">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                <button type="submit" className="auth-btn-primary">
                  Iniciar Sesión
                </button>

                <p className="auth-footer">
                  ¿No tienes una cuenta?{" "}
                  <Link to="/register" className="auth-link-strong">
                    Regístrate aquí
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
