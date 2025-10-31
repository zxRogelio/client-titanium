// AboutUs.jsx
import "../styles/about.css";

const AboutUs = () => {
  return (
    <div className="page-container">
      {/* Background Animations */}
      <div className="bg-animation">
        <div className="bg-grid"></div>
        <div className="bg-glow bg-glow-1"></div>
        <div className="bg-glow bg-glow-2"></div>
      </div>

      {/* Breadcrumbs */}
      <nav className="breadcrumbs">
        <ul className="breadcrumb-list">
          <li className="breadcrumb-item">
            <a href="/" className="breadcrumb-link">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              Inicio
            </a>
          </li>
          <li className="breadcrumb-separator">/</li>
          <li className="breadcrumb-item">
            <span className="breadcrumb-current">Acerca de Nosotros</span>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="brush-title text-red">NUESTRA HISTORIA</h1>
          <p className="about-hero-subtitle">
            Más de 10 años transformando vidas a través del fitness
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision-section">
        <div className="mission-vision-container">
          <div className="mission-card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5V7H9V5.5L3 7V9L9 10.5V12.5L3 14V16L9 17.5V21H15V17.5L21 16V14L15 12.5V10.5L21 9Z" />
              </svg>
            </div>
            <h3 className="card-title">Nuestra Misión</h3>
            <p className="card-description">
              Proporcionar un ambiente inspirador donde cada persona pueda
              alcanzar su máximo potencial físico y mental, con equipamiento de
              última generación y entrenadores altamente capacitados.
            </p>
          </div>

          <div className="vision-card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9ZM12 4.5C17 4.5 21.27 7.61 23 12C21.27 16.39 17 19.5 12 19.5C7 19.5 2.73 16.39 1 12C2.73 7.61 7 4.5 12 4.5ZM3.18 12C4.83 15.36 8.24 17.5 12 17.5C15.76 17.5 19.17 15.36 20.82 12C19.17 8.64 15.76 6.5 12 6.5C8.24 6.5 4.83 8.64 3.18 12Z" />
              </svg>
            </div>
            <h3 className="card-title">Nuestra Visión</h3>
            <p className="card-description">
              Ser el gimnasio líder en innovación fitness, reconocido por
              nuestra comunidad como el espacio donde se forjan campeones tanto
              dentro como fuera del gimnasio.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section">
        <div className="timeline-container">
          <h2 className="brush-title">NUESTRO RECORRIDO</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">2013</div>
              <div className="timeline-content">
                <h3>Fundación</h3>
                <p>
                  Abrimos nuestras primeras instalaciones con 500m² dedicados al
                  fitness de calidad.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2016</div>
              <div className="timeline-content">
                <h3>Expansión</h3>
                <p>
                  Duplicamos nuestro espacio y añadimos zona de crossfit y
                  entrenamiento funcional.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2019</div>
              <div className="timeline-content">
                <h3>Tecnología</h3>
                <p>
                  Implementamos sistemas de entrenamiento inteligente y app
                  móvil exclusiva.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2023</div>
              <div className="timeline-content">
                <h3>Liderazgo</h3>
                <p>
                  Reconocidos como el mejor gimnasio de la ciudad por 3 años
                  consecutivos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-container">
          <h2 className="brush-title">NUESTRO EQUIPO</h2>
          <p className="team-subtitle">
            Profesionales certificados comprometidos con tu éxito
          </p>

          <div className="team-grid">
            <div className="team-card">
              <div className="team-image">
                <div className="image-placeholder"></div>
              </div>
              <div className="team-info">
                <h3>MARCO RODRÍGUEZ</h3>
                <p className="team-role">Head Coach</p>
                <p className="team-bio">
                  Especialista en entrenamiento funcional con más de 8 años de
                  experiencia.
                </p>
              </div>
            </div>

            <div className="team-card">
              <div className="team-image">
                <div className="image-placeholder"></div>
              </div>
              <div className="team-info">
                <h3>SOFÍA MARTÍNEZ</h3>
                <p className="team-role">Nutrition Coach</p>
                <p className="team-bio">
                  Nutricionista deportiva certificada, experta en planes
                  personalizados.
                </p>
              </div>
            </div>

            <div className="team-card">
              <div className="team-image">
                <div className="image-placeholder"></div>
              </div>
              <div className="team-info">
                <h3>CARLOS LÓPEZ</h3>
                <p className="team-role">Strength Coach</p>
                <p className="team-bio">
                  Campeón nacional de powerlifting y especialista en fuerza.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="values-container">
          <h2 className="brush-title">NUESTROS VALORES</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">💪</div>
              <h3>DISCIPLINA</h3>
              <p>Creemos en la consistencia como clave del éxito deportivo.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🤝</div>
              <h3>COMUNIDAD</h3>
              <p>Un ambiente de apoyo donde todos crecemos juntos.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🚀</div>
              <h3>INNOVACIÓN</h3>
              <p>Siempre a la vanguardia en técnicas y equipamiento.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">❤️</div>
              <h3>PASIÓN</h3>
              <p>Amamos lo que hacemos y se refleja en nuestros resultados.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="about-cta-content">
          <h2 className="brush-title text-white">
            ¿LISTO PARA UNIRTE A NUESTRA FAMILIA?
          </h2>
          <p className="about-cta-subtitle">
            Comienza tu transformación hoy mismo
          </p>
          <div className="about-cta-buttons">
            <a href="/planes" className="cta-btn-primary">
              VER PLANES
              <svg
                className="btn-arrow"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="/contacto" className="cta-btn-secondary">
              AGENDAR VISITA
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
