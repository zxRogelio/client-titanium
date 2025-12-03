import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth"; // ✅ Importar contexto
import Logo from "../assets/LogoP.png";

export default function NavbarCliente() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // ✅ Usar auth

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout(); // ✅ Usa función centralizada de logout
    navigate("/login");
    
  };

  return (
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="header-content">
        {/* Logo */}
        <div className="logo-container">
          <Link to={`/${user?.rol || ""}`}>
            <img src={Logo} alt="Titanium Sport Gym" className="logo-image" />
          </Link>
        </div>

        {/* Enlaces desktop */}
        <nav className="nav-desktop">
          <div className="nav-main-links">
            <Link to="/cliente" className="nav-link">INICIO</Link>
            <Link to="/catalogue" className="nav-link">PRODUCTOS</Link>
            <Link to="/suscripciones" className="nav-link">SUSCRIPCIONES</Link>
          </div>

          {/* Botón de perfil tipo hamburguesa */}
          <div className="nav-profile">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="profile-menu-btn"
              title="Menú de perfil"
            >
              <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Menú desplegable */}
            {menuOpen && (
              <div className="dropdown-menu">
                <Link
                  to="/cliente/configuracion"
                  className="dropdown-link"
                  onClick={() => setMenuOpen(false)}
                >
                  ⚙️ Configuración
                </Link>
                <button onClick={handleLogout} className="dropdown-link logout-btn">
                  🔓 Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
