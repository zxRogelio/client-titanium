// src/pages/OAuthCallbackPage.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    console.log("🔁 OAuthCallbackPage montado");

    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const roleParam = searchParams.get("role");

    console.log("📩 Parámetros recibidos desde Google:", {
      token,
      email,
      roleParam,
    });

    if (!token || !email) {
      console.warn("⚠️ Falta token o email, redirigiendo a /login");
      navigate("/login", { replace: true });
      return;
    }

    const role = roleParam || "cliente";

    const user = {
      email,
      rol: role as "cliente" | "entrenador" | "admin",
      loginMethod: "google" as const, // 👈 importante
    };

    try {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      console.log("✅ Usuario guardado (Google), rol:", role);

      switch (role) {
        case "cliente":
          navigate("/cliente", { replace: true });
          break;
        case "entrenador":
          navigate("/entrenador", { replace: true });
          break;
        case "admin":
        case "administrador":
          navigate("/admin", { replace: true });
          break;
        default:
          navigate("/", { replace: true });
          break;
      }
    } catch (err) {
      console.error("❌ Error en OAuthCallbackPage:", err);
      navigate("/login", { replace: true });
    }
  }, [searchParams, navigate, setUser]);

  return (
    <div className="auth-layout">
      <main className="auth-main">
        <div className="auth-page">
          <div className="auth-form-section">
            <div className="auth-form-container">
              <h1 className="auth-title">Procesando inicio de sesión...</h1>
              <p className="auth-subtitle">
                Estamos validando tu cuenta de Google. Esto tomará solo un
                momento.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
