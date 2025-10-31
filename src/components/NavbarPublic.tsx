// src/components/NavbarPublic.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/LogoP.png"; // Asegúrate que la ruta sea correcta

export default function NavbarPublic() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setCurrentPage] = useState("Inicio");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="header-content">
        <div className="logo-container">
          <Link to="/">
            <img src={Logo} alt="Titanium Sport Gym" className="logo-image" />
          </Link>
        </div>

        <nav className="nav-desktop">
          <div className="nav-main-links">
            <Link to="/" className="nav-link" onClick={() => setCurrentPage("Inicio")}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10h3m10-11l2 2v10h-3m-6 0h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
              INICIO
              <span className="nav-underline" />
            </Link>

            <Link to="/catalogue" className="nav-link">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
              PRODUCTOS
              <span className="nav-underline" />
            </Link>

            <Link to="/suscripciones" className="nav-link">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
              SUSCRIPCIONES
              <span className="nav-underline" />
            </Link>

            <Link to="#" className="nav-link">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
              ACERCA DE NOSOTROS
              <span className="nav-underline" />
            </Link>
          </div>

          <div className="nav-action-links">
            <div className="nav-divider" />
            <Link to="/register" className="slider-btn-outline">SUSCRÍBETE</Link>
            <Link to="/login" className="slider-btn-solid">INICIA SESIÓN</Link>
          </div>
        </nav>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-menu-btn">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav">
            <Link to="/" className="mobile-nav-link" onClick={() => setCurrentPage("Inicio")}>INICIO</Link>
            <Link to="/catalogue" className="mobile-nav-link" onClick={() => setCurrentPage("Productos")}>PRODUCTOS</Link>
            <Link to="/suscripciones" className="mobile-nav-link" onClick={() => setCurrentPage("Servicios")}>SUSCRIPCIONES</Link>
            <Link to="#" className="mobile-nav-link" onClick={() => setCurrentPage("Acerca de")}>ACERCA DE</Link>

            <div className="mobile-nav-buttons">
              <Link to="/register" className="slider-btn-outline">SUSCRÍBETE</Link>
              <Link to="/login" className="slider-btn-solid">INICIA SESIÓN</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
