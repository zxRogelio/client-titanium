import { useState, useEffect, type JSX } from "react";
import "../styles/suscripciones.css";
import Logo from "../assets/LogoP.png";
import { Link } from "react-router-dom";

/* ========================================================
   🧩 INTERFACES Y TIPOS
======================================================== */
interface Membership {
  id: number;
  name: string;
  level: string;
  price: number;
  duration: string;
  color: string;
  features: string[];
  popular: boolean;
  description: string;
}

interface Service {
  title: string;
  desc: string;
  icon: string;
}

/* ========================================================
   📦 DATOS DE MEMBRESÍAS
======================================================== */
const memberships: Membership[] = [
  {
    id: 1,
    name: "CARTE BLANCHE",
    level: "BÁSICO",
    price: 299,
    duration: "mes",
    color: "white",
    features: [
      "Acceso a área de pesas",
      "Clases grupales básicas",
      "Vestidores y regaderas",
      "App Titanium básica",
      "Horario estándar",
      "Sin permanencia",
    ],
    popular: false,
    description: "Perfecto para comenzar tu journey fitness",
  },
  {
    id: 2,
    name: "TITANIUM ROJO",
    level: "MÁS POPULAR",
    price: 499,
    duration: "mes",
    color: "red",
    features: [
      "Todo lo del plan Básico",
      "Acceso 24/7",
      "Clases grupales premium",
      "Área cardio completo",
      "App Titanium premium",
      "2 sesiones con entrenador",
      "Evaluación física mensual",
      "Estacionamiento preferente",
    ],
    popular: true,
    description: "El equilibrio perfecto entre calidad y precio",
  },
  {
    id: 3,
    name: "TITANIUM NEGRO",
    level: "PREMIUM",
    price: 799,
    duration: "mes",
    color: "black",
    features: [
      "Todo lo del plan Estándar",
      "Entrenador personal dedicado",
      "Acceso a zona VIP",
      "Nutricionista certificado",
      "Plan alimenticio personalizado",
      "Sesiones ilimitadas con coach",
      "Invitados gratis (2 por mes)",
      "Lockers premium",
    ],
    popular: false,
    description: "Experiencia fitness de élite completa",
  },
];

/* ========================================================
   🏋️‍♂️ SERVICIOS ADICIONALES
======================================================== */
const services: Service[] = [
  {
    title: "Entrenamiento Personalizado",
    desc: "Programas diseñados específicamente para tus objetivos con seguimiento constante de nuestros coaches certificados.",
    icon: "💪",
  },
  {
    title: "Asesoría Nutricional",
    desc: "Planes alimenticios personalizados y suplementación guiada por expertos en nutrición deportiva.",
    icon: "🥗",
  },
  {
    title: "Clases Grupales",
    desc: "HIIT, Yoga, Box, Spinning y más. Más de 45 clases semanales para mantener tu motivación al máximo.",
    icon: "👥",
  },
  {
    title: "Zona de Pesas Premium",
    desc: "Equipamiento Hammer Strength, racks olímpicos y área de peso libre completamente equipada.",
    icon: "🏋️",
  },
  {
    title: "App Titanium",
    desc: "Seguimiento de progreso, reservación de clases, planificación de workouts y comunidad exclusiva.",
    icon: "📱",
  },
  {
    title: "Área de Recuperación",
    desc: "Sauna, zona de stretching y recuperación activa para optimizar tu rendimiento.",
    icon: "🧘",
  },
];

/* ========================================================
   🎨 FUNCIONES DE ESTILO
======================================================== */
const getMembershipColor = (color: string): string => {
  switch (color) {
    case "white":
      return "#ffffff";
    case "red":
      return "#ef4444";
    case "black":
      return "#1a1a1a";
    default:
      return "#1a1a1a";
  }
};

const getTextColor = (color: string): string =>
  color === "white" ? "#1a1a1a" : "#ffffff";

const getBorderColor = (color: string): string =>
  color === "white" ? "#e5e5e5" : getMembershipColor(color);

/* ========================================================
   🧠 COMPONENTE PRINCIPAL
======================================================== */
export default function ServicesPage(): JSX.Element {
  const [, setScrolled] = useState<boolean>(false);
  const [currentPage] = useState<string>("Servicios");

  useEffect(() => {
    const handleScroll = (): void => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="page-container">
      {/* Fondo animado */}
      <div className="bg-animation">
        <div className="bg-grid" />
        <div className="bg-glow bg-glow-1" />
        <div className="bg-glow bg-glow-2" />
      </div>

      {/* Breadcrumbs */}
      <nav className="breadcrumbs">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link to="/" className="breadcrumb-link">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              INICIO
            </Link>
          </li>
          <li className="breadcrumb-separator">/</li>
          <li className="breadcrumb-item">
            <span className="breadcrumb-current">{currentPage}</span>
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero-content">
          <h1 className="services-title brush-text">MEMBRESÍAS TITANIUM</h1>
          <p className="services-subtitle">
            Descubre el plan perfecto para tu transformación. Desde el acceso
            básico hasta la experiencia premium completa.
          </p>
        </div>
      </section>

      {/* Membresías */}
      <section className="memberships-section">
        <div className="memberships-container">
          <div className="memberships-grid">
            {memberships.map((membership: Membership) => (
              <div
                key={membership.id}
                className={`membership-card ${
                  membership.popular ? "membership-popular" : ""
                }`}
                style={{
                  background: getMembershipColor(membership.color),
                  color: getTextColor(membership.color),
                  border: `2px solid ${getBorderColor(membership.color)}`,
                }}
              >
                {membership.popular && (
                  <div className="popular-badge">MÁS POPULAR</div>
                )}

                <div className="membership-header">
                  <div
                    className="membership-level"
                    style={{
                      color:
                        membership.color === "white" ? "#ef4444" : "#ffffff",
                    }}
                  >
                    {membership.level}
                  </div>
                  <h3
                    className="membership-name brush-text"
                    style={{ color: getTextColor(membership.color) }}
                  >
                    {membership.name}
                  </h3>
                  <p className="membership-description">
                    {membership.description}
                  </p>
                </div>

                <div className="membership-price">
                  <span className="price-currency">$</span>
                  <span className="price-amount">{membership.price}</span>
                  <span className="price-duration">/{membership.duration}</span>
                </div>

                <ul className="membership-features">
                  {membership.features.map((feature: string, index: number) => (
                    <li key={index} className="feature-item">
                      <svg
                        className="feature-icon"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        style={{
                          color:
                            membership.color === "white"
                              ? "#ef4444"
                              : "#ffffff",
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        />
                      </svg>
                      <span style={{ color: getTextColor(membership.color) }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`membership-btn ${
                    membership.color === "white" ? "btn-outline" : "btn-solid"
                  }`}
                  style={{
                    background:
                      membership.color === "white"
                        ? "transparent"
                        : getMembershipColor(membership.color),
                    border: `2px solid ${
                      membership.color === "white"
                        ? "#1a1a1a"
                        : getMembershipColor(membership.color)
                    }`,
                    color: membership.color === "white" ? "#1a1a1a" : "#ffffff",
                  }}
                >
                  ELEGIR PLAN
                  <svg
                    className="btn-arrow"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios Adicionales */}
      <section className="services-section">
        <div className="services-container">
          <div className="services-header">
            <h2 className="services-main-title brush-title">
              SERVICIOS <span className="text-red">TITANIUM</span>
            </h2>
            <p className="services-main-subtitle">
              Más que un gimnasio, somos tu partner en el journey fitness.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service: Service, index: number) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="services-cta">
        <div className="cta-card-horizontal">
          <div className="cta-bg-1" />
          <div className="cta-bg-2" />
          <div className="cta-content-horizontal">
            <div className="cta-text-section">
              <h3 className="cta-title brush-text">
                PRIMERA SEMANA <span className="text-red">GRATIS</span>
                <span className="cta-title-sub">EN TODOS LOS PLANES</span>
              </h3>
              <p className="cta-description">
                Experimenta todo lo que Titanium tiene para ofrecerte sin
                compromiso. Tu primera semana es completamente gratis en
                cualquier membresía.
              </p>
              <div className="cta-benefits">
                <div className="benefit-item">✅ 1 SEMANA GRATIS</div>
                <div className="benefit-item">✅ SIN CONTRATOS</div>
                <div className="benefit-item">✅ ASESORÍA INCLUIDA</div>
              </div>
            </div>
            <div className="cta-buttons-section">
              <a href="/visita" className="cta-btn-primary brush-btn">
                AGENDAR VISITA →
              </a>
              <a href="tel:+529981234567" className="cta-btn-secondary">
                LLAMAR AHORA
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="smart-footer">
        <div className="footer-main">
          <div className="footer-content">
            <div className="footer-brand">
              <img src={Logo} alt="Titanium Sport Gym" className="footer-logo" />
            </div>
            <p className="footer-disclaimer">
              *Primera semana gratis aplica para nuevos miembros.
            </p>
            <p className="footer-copy">
              © {new Date().getFullYear()} Titanium Sport Gym. Todos los
              derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
