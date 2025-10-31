import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/LogoP.png";

export default function NavbarEntrenador() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="header-content">
        <div className="logo-container">
          <Link to="/entrenador">
            <img src={Logo} alt="Titanium Sport Gym" className="logo-image" />
          </Link>
        </div>

        <nav className="nav-desktop">
          <div className="nav-main-links">
            <Link to="/entrenador" className="nav-link">INICIO</Link>
            <Link to="/entrenador/clientes" className="nav-link">MIS CLIENTES</Link>
            <Link to="/entrenador/rutinas" className="nav-link">RUTINAS</Link>
          </div>

          <div className="nav-action-links">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="profile-btn">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-profile-menu">
          <nav className="mobile-nav">
            <Link to="/entrenador/perfil" className="mobile-nav-link">Configuración</Link>
            <button onClick={handleLogout} className="mobile-nav-link logout-btn">Cerrar Sesión</button>
          </nav>
        </div>
      )}
    </header>
  );
}
