import React, { useState, useEffect } from "react";
import "../styles/home.css";
import Logo from "../assets/LogoP.png";


const features = [
  {
    title: "Entrenamiento de Fuerza",
    desc: "Área equipada con racks, barras olímpicas y mancuernas para todos.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M3 10h2v4H3v-4zm16 0h2v4h-2v-4zM7 8h2v8H7V8zm8 0h2v8h-2V8zM11 6h2v12h-2V6z" />
      </svg>
    ),
  },
  {
    title: "Clases Funcionales",
    desc: "HIIT, cardio boxing y circuitos que aceleran tu progreso y queman grasa.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M4 4h4v4H4V4zm12 0h4v4h-4V4zM4 16h4v4H4v-4zm12 0h4v4h-4v-4zM10 10h4v4h-4v-4z" />
      </svg>
    ),
  },
  {
    title: "Plan Personalizado",
    desc: "Rutinas y seguimiento con metas claras para fuerza, volumen o definición.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M19 3H5a2 2 0 0 0-2 2v14l4-4h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
      </svg>
    ),
  },
];

const slides = [
  {
    label: "Bienvenido a:",
    title: "Titanium Sport Gym",
    subtitle: "Tu Destino de Transformación",
    description:
      "Descubre un espacio diseñado para potenciar tu rendimiento. Con equipamiento de última generación, entrenadores certificados y una comunidad que te impulsa a superar tus límites cada día.",
  },
  {
    label: "Entrena Con:",
    title: "Profesionales Certificados",
    subtitle: "Experiencia Que Transforma",
    description:
      "Nuestro equipo de entrenadores cuenta con certificaciones internacionales y años de experiencia. Cada sesión está diseñada para maximizar resultados, prevenir lesiones y mantenerte motivado en tu camino hacia el éxito.",
  },
  {
    label: "Alcanza Tus:",
    title: "Objetivos Fitness",
    subtitle: "Resultados Reales Y Medibles",
    description:
      "Ya sea ganar músculo, perder grasa o mejorar tu condición física, tenemos el plan perfecto para ti. Programas personalizados, seguimiento continuo y técnicas probadas que garantizan tu progreso constante.",
  },
  {
    label: "Únete a:",
    title: "La Comunidad Titanium",
    subtitle: "Más Que Un Gimnasio",
    description:
      "Forma parte de una familia que comparte tus objetivos. Eventos exclusivos, clases grupales energéticas y un ambiente de apoyo donde cada logro se celebra. Aquí encontrarás motivación, amistad y resultados.",
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState("Inicio");
  const [, setScrolled] = useState(false); // ✅ Declaración real de setScrolled

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: React.SetStateAction<number>) => {
    setCurrentSlide(index);
  };

  return (
    <div className="page-container">
      {/* Animated background elements */}
      <div className="bg-animation">
        <div className="bg-grid" />
        <div className="bg-glow bg-glow-1" />
        <div className="bg-glow bg-glow-2" />
      </div>


      {/* Breadcrumbs */}
      <nav className="breadcrumbs">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <a
              href="#"
              className="breadcrumb-link"
              onClick={() => setCurrentPage("Inicio")}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              INICIO
            </a>
          </li>
          {currentPage !== "Inicio" && (
            <>
              <li className="breadcrumb-separator">/</li>
              <li className="breadcrumb-item">
                <span className="breadcrumb-current">{currentPage}</span>
              </li>
            </>
          )}
        </ol>
      </nav>

      {/* Hero Slider */}
      <section className="hero-slider">
        <div className="slider-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${
                index === currentSlide ? "slide-active" : ""
              }`}
            >
              <div className="slide-content">
                <p className="slide-label">{slide.label}</p>
                <h1 className="slide-title brush-text">{slide.title}</h1>
                <h2 className="slide-subtitle brush-text">{slide.subtitle}</h2>
                <p className="slide-description">{slide.description}</p>

                <div className="slide-buttons">
                  <a href="#" className="slider-btn-solid brush-btn">
                    SUSCRÍBETE
                  </a>
                  <a href="#" className="slider-btn-outline">
                    CONOCE MÁS
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="slider-arrow slider-arrow-left"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="slider-arrow slider-arrow-right"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="slider-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`slider-dot ${
                  index === currentSlide ? "slider-dot-active" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="features-header">
          <h2 className="features-title brush-title">
            ¿POR QUÉ <span className="text-red">TITANIUM</span>?
          </h2>
          <p className="features-subtitle">
            Instalaciones de primer nivel diseñadas para llevar tu entrenamiento
            al siguiente nivel
          </p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="feature-card"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="feature-glow" />
              <div className="feature-content">
                <div className="feature-inner">
                  <div className="feature-icon">{f.icon}</div>
                  <div className="feature-text">
                    <h3 className="feature-title">{f.title}</h3>
                    <p className="feature-desc">{f.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}

      {/* New Footer - Smart Fit Style */}
      <footer className="smart-footer">
        <div className="footer-main">
          <div className="footer-content">
            <div className="footer-brand">
              <img
                src={Logo}
                alt="Titanium Sport Gym"
                className="footer-logo"
              />
              <div className="social-links">
                <span className="follow-text">SÍGUENOS</span>
                <div className="social-icons">
                  <a href="#" className="social-icon">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a href="#" className="social-icon">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
                  </a>
                  <a href="#" className="social-icon">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.017z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="footer-columns">
              <div className="footer-column">
                <h4 className="footer-column-title">Titanium</h4>
                <ul className="footer-links">
                  <li>
                    <a href="#" className="footer-link">
                      Quiénes somos
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Habla con nosotros
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Aviso de Privacidad
                    </a>
                  </li>
                </ul>
              </div>

              <div className="footer-column">
                <h4 className="footer-column-title">Planes</h4>
                <ul className="footer-links">
                  <li>
                    <a href="#" className="footer-link">
                      Membresías
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Contratos
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Titanium Coach
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Titanium Body
                    </a>
                  </li>
                </ul>
              </div>

              <div className="footer-column">
                <h4 className="footer-column-title">Nuestra Compañía</h4>
                <ul className="footer-links">
                  <li>
                    <a href="#" className="footer-link">
                      Quiero ser entrenador
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Promociona tu marca
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Indica un local
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Trabaja con nosotros
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-disclaimer">
              *Consulte las condiciones promocionales y reglamentos en la
              página: titaniumsportgym.com/terminos-condiciones
            </p>
            <p className="footer-copyright">
              © {new Date().getFullYear()} Titanium Sport Gym. Todos los
              derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}