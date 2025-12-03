/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import { API } from "../api/api";
import "../styles/auth.css";
import GoogleLogo from "../assets/google-logo.svg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [, setScrolled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", { email, password });

      // 🔐 Si requiere 2FA, solo redirigimos al flujo y NO guardamos sesión todavía
      if (res.data.twoFactorRequired) {
        const method = res.data.method?.toLowerCase();

        if (method === "totp") {
          navigate("/login-totp", { state: { email } });
          setLoading(false);
          return;
        }
        if (method === "confirm-link") {
          navigate("/esperando-confirmacion", { state: { email } });
          setLoading(false);
          return;
        }
        if (method === "otp") {
          navigate("/verificar-otp", { state: { email } });
          setLoading(false);
          return;
        }
      }

      // 🟢 Login normal (sin 2FA)
      const { accessToken, user } = res.data;

      if (accessToken && user) {
        // role viene a veces como 'role' y a veces como 'rol'
        const userRole = user.role || user.rol || "cliente";

        // 🔹 Usuario que guardamos EN EL FRONT
        const userForStorage = {
          id: user.id,
          email: user.email,
          rol: userRole as "cliente" | "entrenador" | "admin",
          loginMethod: "local" as const, // 👈 MUY IMPORTANTE
        };

        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(userForStorage));
        setUser(userForStorage);

        // Redirección por rol
        switch (userRole) {
          case "cliente":
            navigate("/cliente");
            break;
          case "entrenador":
            navigate("/entrenador");
            break;
          case "admin":
          case "administrador":
            navigate("/admin");
            break;
          default:
            navigate("/");
        }
      }
    } catch (err: any) {
      console.error("Error al iniciar sesión:", err);

      if (axios.isAxiosError(err)) {
        const status = err.response?.status;

        if (status === 429) {
          setErrorMessage(
            "Has intentado iniciar sesión demasiadas veces. Intenta de nuevo más tarde."
          );
        } else if (status === 400 || status === 401) {
          setErrorMessage("Correo o contraseña incorrectos.");
        } else {
          setErrorMessage(
            "No se pudo iniciar sesión. Intenta de nuevo en unos momentos."
          );
        }
      } else {
        setErrorMessage("Error inesperado al iniciar sesión.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Login con Google (OAuth)
  const handleGoogleLogin = () => {
    const baseUrl = import.meta.env.VITE_API_URL;
    window.location.href = `${baseUrl}/auth/google`;
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
                {errorMessage && (
                  <div className="auth-error">{errorMessage}</div>
                )}

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

                <button
                  type="submit"
                  className="auth-btn-primary"
                  disabled={loading}
                >
                  {loading ? "Iniciando..." : "Iniciar Sesión"}
                </button>

                {/* 🔹 Botón Google */}
                <button
                  type="button"
                  className="auth-btn-google"
                  onClick={handleGoogleLogin}
                >
                  <span className="google-logo-wrap">
                                                <img
                  src={GoogleLogo}
                  alt="Google"
                  className="google-logo"
                />


                  </span>
                  <span>Continuar con Google</span>
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
