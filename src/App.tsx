import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider"; // ✅
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CatalogePage from "./pages/CatalogePage";
import SuscripcionesPage from "./pages/SuscripcionesPage";
import AboutPage from "./pages/AboutPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import VerifyAccountPage from "./pages/VerifyAccountPage";
import ClienteDashboard from "./pages/ClienteDashboard";
import EntrenadorDashboard from "./pages/EntrenadorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ConfiguracionPage from "./pages/Configuracion2FA";
import ConfirmAccessPage from "./pages/ConfirmAccessPage";
import LoginTOTP from "./pages/LoginTOTP";
import VerificarOTP from "./pages/VerificarOTP";
import EsperandoConfirmacionPage from "./pages/EsperandoConfirmacionPage";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyResetCode from "./pages/VerifyResetCode";
import NewPassword from "./pages/NewPassword";
import OAuthCallbackPage from "./pages/OAuthCallbackPage";


export default function App() {
              console.log("🚀 App montada en producción");

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/oauth-callback" element={<OAuthCallbackPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/catalogue" element={<CatalogePage />} />
            <Route path="/suscripciones" element={<SuscripcionesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/verify-account" element={<VerifyAccountPage />} />
            <Route path="/cliente" element={<ClienteDashboard />} />
            <Route path="/entrenador" element={<EntrenadorDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/cliente/configuracion" element={<ConfiguracionPage />} />
            <Route path="/confirmar-acceso" element={<ConfirmAccessPage />} />
            <Route path="/login-totp" element={<LoginTOTP />} />
            <Route path="/verificar-otp" element={<VerificarOTP />} />
            <Route path="/esperando-confirmacion" element={<EsperandoConfirmacionPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-reset" element={<VerifyResetCode />} />
            <Route path="/new-password" element={<NewPassword />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
