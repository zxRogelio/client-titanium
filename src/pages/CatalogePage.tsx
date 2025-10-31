import { useState, useEffect } from "react";
import "../styles/cataloge.css";
import Logo from "../assets/LogoP.png";
import { Link } from "react-router-dom";

// Datos de ejemplo para productos
const products = [
  {
    id: 1,
    name: "Proteína Whey Gold Standard",
    category: "PROTEÍNA",
    price: 899,
    image:
      "https://suplementosags.com/wp-content/uploads/2019/08/Comp-Gold-Standard-5Lbs-Marca-de-Agua.png",
    featured: true,
  },
  {
    id: 2,
    name: "Creatina Monohidratada",
    category: "CREATINA",
    price: 599,
    image: "https://via.placeholder.com/300x300/ef4444/ffffff?text=CREATINA",
    featured: true,
  },
  {
    id: 3,
    name: "Pre-Entreno Explosive",
    category: "PRE-ENTRENO",
    price: 699,
    image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=PRE+ENTRENO",
    featured: false,
  },
  {
    id: 4,
    name: "BCAA Amino Ácidos",
    category: "INTRA-ENTRENO",
    price: 499,
    image: "https://via.placeholder.com/300x300/ef4444/ffffff?text=BCAA",
    featured: false,
  },
  {
    id: 5,
    name: "Tank Top Titanium",
    category: "ROPA",
    price: 349,
    image:
      "https://png.pngtree.com/png-vector/20231014/ourmid/pngtree-gray-sport-tank-top-mockup-hanging-png-file-png-image_10159020.png",
    featured: true,
  },
  {
    id: 6,
    name: "Shorts Deportivos",
    category: "ROPA",
    price: 299,
    image:
      "https://acide.com.mx/cdn/shop/files/ShortMexicocaballerofrente.png?v=1701984228&width=3840",
    featured: false,
  },
  {
    id: 7,
    name: "Mass Gainer",
    category: "GANANCIA MÚSCULAR",
    price: 799,
    image:
      "https://bodyfitsupplements.com.mx/cdn/shop/files/PROTEINASBODY_30.png?v=1733072937",
    featured: true,
  },
  {
    id: 8,
    name: "Quemador de Grasa",
    category: "CONTROL DE PESO",
    price: 649,
    image: "https://via.placeholder.com/300x300/ef4444/ffffff?text=QUEMADOR",
    featured: false,
  },
  {
    id: 9,
    name: "Multivitamínico Premium",
    category: "SALUD • BIENESTAR",
    price: 399,
    image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=VITAMINAS",
    featured: true,
  },
  {
    id: 10,
    name: "Hoodie Titanium",
    category: "ROPA",
    price: 599,
    image: "https://via.placeholder.com/300x300/ef4444/ffffff?text=HOODIE",
    featured: false,
  },
];

const categories = [
  "TODOS",
  "PRE-ENTRENO",
  "INTRA-ENTRENO",
  "GANANCIA MÚSCULAR",
  "PROTEÍNA",
  "CREATINA",
  "CONTROL DE PESO",
  "SALUD • BIENESTAR",
  "ROPA",
];

const sortOptions = [
  "RECOMENDADO",
  "PRECIO: MENOR A MAYOR",
  "PRECIO: MAYOR A MENOR",
  "MÁS POPULARES",
  "MÁS NUEVOS",
];

// Componente principal del catálogo
export default function CatalogoPage() {
  const [, setScrolled] = useState(false);
  const [currentPage] = useState("Productos");
  const [selectedCategory, setSelectedCategory] = useState("TODOS");
  const [sortBy, setSortBy] = useState("RECOMENDADO");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filtrar productos cuando cambia la categoría o el orden
  useEffect(() => {
    let filtered = products;

    // Filtrar por categoría
    if (selectedCategory !== "TODOS") {
      filtered = products.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Ordenar productos
    switch (sortBy) {
      case "PRECIO: MENOR A MAYOR":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "PRECIO: MAYOR A MENOR":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "MÁS POPULARES":
        filtered.sort((a, b) =>
          b.featured === a.featured ? 0 : b.featured ? 1 : -1
        );
        break;
      case "MÁS NUEVOS":
        filtered.reverse();
        break;
      default:
        // RECOMENDADO - mantener orden original
        break;
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy]);

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

      {/* Hero Section del Catálogo */}
      <section className="catalog-hero">
        <div className="catalog-hero-content">
          <h1 className="catalog-title brush-text">TIENDA TITANIUM</h1>
          <p className="catalog-subtitle">
            Descubre nuestra selección premium de suplementos deportivos y ropa
            de entrenamiento diseñada para maximizar tu rendimiento y estilo
          </p>
        </div>
      </section>

      {/* Filtros y Ordenamiento */}
      <section className="catalog-filters">
        <div className="filters-container">
          {/* Filtros por categoría */}
          <div className="category-filters">
            <div className="filter-label">FILTRAR POR —</div>
            <div className="category-buttons">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${
                    selectedCategory === category ? "category-btn-active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Ordenamiento */}
          <div className="sort-filters">
            <div className="filter-label">ORDENAR POR</div>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Grid de Productos */}
      <section className="products-grid-section">
        <div className="products-container">
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  {product.featured && (
                    <div className="product-badge">POPULAR</div>
                  )}
                  <button className="product-wishlist">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>

                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-category">{product.category}</div>
                  <div className="product-price">${product.price}.00 MXN</div>

                  <div className="product-actions">
                    <button className="add-to-cart-btn">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      AGREGAR AL CARRITO
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="catalog-cta">
        <div className="cta-card-horizontal">
          <div className="cta-bg-1" />
          <div className="cta-bg-2" />

          <div className="cta-content-horizontal">
            <div className="cta-text-section">
              <h3 className="cta-title brush-text">
                ENVÍO GRATIS <span className="text-red">EN COMPRAS</span>
                <span className="cta-title-sub">MAYORES A $599</span>
              </h3>
              <p className="cta-description">
                Obtén envío gratuito en toda la república mexicana en compras
                mayores a $599. También contamos con retiro en nuestro gimnasio
                sin costo adicional y asesoría personalizada.
              </p>

              <div className="cta-benefits">
                <div className="benefit-item">
                  <svg
                    className="benefit-icon"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  ENVÍO GRATIS +$599
                </div>
                <div className="benefit-item">
                  <svg
                    className="benefit-icon"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  RETIRO EN GIMNASIO
                </div>
                <div className="benefit-item">
                  <svg
                    className="benefit-icon"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  ASESORÍA ESPECIALIZADA
                </div>
              </div>
            </div>

            <div className="cta-buttons-section">
              <div className="cta-buttons-vertical">
                <a href="#" className="cta-btn-primary brush-btn">
                  VER OFERTAS
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
                </a>
                <a href="#" className="cta-btn-secondary">
                  CONTACTAR ASESOR
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                <h4 className="footer-column-title">Titanium Sport Gym</h4>
                <ul className="footer-links">
                  <li>
                    <a href="#" className="footer-link">
                      Quiénes somos
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Contáctanos
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
                <h4 className="footer-column-title">Productos</h4>
                <ul className="footer-links">
                  <li>
                    <a href="#" className="footer-link">
                      Suplementos
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Ropa Deportiva
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Accesorios
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Ofertas Especiales
                    </a>
                  </li>
                </ul>
              </div>

              <div className="footer-column">
                <h4 className="footer-column-title">Servicios</h4>
                <ul className="footer-links">
                  <li>
                    <a href="#" className="footer-link">
                      Envíos y Entregas
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Garantías
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Preguntas Frecuentes
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
              *Envío gratis aplica en compras mayores a $599. Consulta términos
              y condiciones completos en nuestro gimnasio.
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
