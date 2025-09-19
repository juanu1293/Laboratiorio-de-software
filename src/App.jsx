import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";

// Importamos los componentes
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./ChangePassword"; // Nueva importación

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />{" "}
        {/* Nueva ruta */}
      </Routes>
    </Router>
  );
};
// Componente de la página de inicio (tu App original)
const HomePage = () => {
  const [tripType, setTripType] = useState("roundtrip");
  const [origin, setOrigin] = useState("Frankfurt am Main");
  const [destination, setDestination] = useState("Bangkok");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  // URL de ejemplo para el logo (reemplázala con tu imagen)
  const logoUrl =
    "https://i.pinimg.com/736x/60/48/b4/6048b4ae7f74724389d345767e8061a0.jpg";

  // Función para mostrar el mensaje de "próximamente"
  const handleComingSoon = () => {
    alert("Esta funcionalidad estará activa próximamente");
  };

  // Función para redirigir al inicio al hacer clic en el logo
  const handleLogoClick = () => {
    navigate("/");
  };

  // Inicializar fechas al cargar el componente
  useEffect(() => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    setDepartureDate(today.toISOString().split("T")[0]);
    setReturnDate(nextWeek.toISOString().split("T")[0]);
  }, []);

  const popularDestinations = [
    {
      name: "Madrid",
      image:
        "https://i.pinimg.com/736x/94/a1/7b/94a17b9195902697d977665eca20cc2f.jpg",
      description:
        "Madrid, la capital de España, es conocida por su rica herencia cultural, edificios históricos y vida nocturna vibrante.",
      price: "Desde ****",
      duration: "9 horas",
      bestTime: "** de ****",
    },
    {
      name: "Nueva York",
      image:
        "https://i.pinimg.com/1200x/ec/d1/c5/ecd1c529ffa462f1ae3df97fbfbb1ab4.jpg",
      description:
        "Nueva York, la ciudad que nunca duerme, ofrece experiencias únicas con sus rascacielos, Broadway y diversidad cultural.",
      price: "Desde *****",
      duration: "6 horas",
      bestTime: "** de ****",
    },
    {
      name: "Miami",
      image:
        "https://i.pinimg.com/736x/59/36/24/59362492e00b42138c6af00da2ac4b5a.jpg",
      description:
        "Miami es famosa por sus playas soleadas, vida nocturna emocionante y influencia latinoamericana.",
      price: "Desde *****",
      duration: "4 horas",
      bestTime: "** de *****",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    // Validación de fechas solo para viajes redondos
    if (
      tripType === "roundtrip" &&
      new Date(returnDate) < new Date(departureDate)
    ) {
      alert("La fecha de retorno no puede ser anterior a la fecha de salida");
      return;
    }

    // Lógica para buscar vuelos
    alert(`Buscando vuelos de ${origin} a ${destination} 
           Salida: ${formatDisplayDate(departureDate)} 
           ${
             tripType === "roundtrip"
               ? `Retorno: ${formatDisplayDate(returnDate)}`
               : ""
           }`);
  };

  const formatDisplayDate = (dateString) => {
    const options = { weekday: "short", day: "numeric", month: "short" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const handleDepartureDateChange = (e) => {
    const newDepartureDate = e.target.value;
    setDepartureDate(newDepartureDate);

    // Solo ajustar la fecha de retorno si es un viaje redondo
    if (
      tripType === "roundtrip" &&
      new Date(returnDate) < new Date(newDepartureDate)
    ) {
      setReturnDate(newDepartureDate);
    }
  };

  const handleReturnDateChange = (e) => {
    setReturnDate(e.target.value);
  };

  const handleDestinationClick = (dest) => {
    setSelectedDestination(dest);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDestination(null);
  };

  const handleLoginClick = () => {
    navigate("/login"); // Redirige a la página de login
  };

  // Obtener la fecha mínima para los inputs (hoy)
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div
          className="logo-container"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          <img src={logoUrl} alt="VivaSky Logo" className="logo-image" />
          <span className="logo-text">VivaSky</span>
        </div>
        <nav className="navigation">
          <a href="#" onClick={handleComingSoon}>
            Reservar
          </a>
          <a href="#" onClick={handleComingSoon}>
            Noticias
          </a>
          <a href="#" onClick={handleComingSoon}>
            Destinos
          </a>
        </nav>
        <button className="sign-up-btn" onClick={handleLoginClick}>
          Iniciar sesión
        </button>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Descubre el mundo mientras viajas con nosotros</h1>
          {/* Flight Search Form */}
          <form className="flight-form" onSubmit={handleSearch}>
            <div className="trip-type">
              <label className={tripType === "roundtrip" ? "active" : ""}>
                <input
                  type="radio"
                  name="tripType"
                  value="roundtrip"
                  checked={tripType === "roundtrip"}
                  onChange={() => setTripType("roundtrip")}
                />
                Ida y vuelta
              </label>
              <label className={tripType === "oneway" ? "active" : ""}>
                <input
                  type="radio"
                  name="tripType"
                  value="oneway"
                  checked={tripType === "oneway"}
                  onChange={() => setTripType("oneway")}
                />
                Solo ida
              </label>
            </div>

            <div className="form-fields">
              <div className="input-group">
                <label>Salida</label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Destino</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Fecha de salida</label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={handleDepartureDateChange}
                  min={today}
                />
              </div>

              {tripType === "roundtrip" && (
                <div className="input-group">
                  <label>Fecha de retorno</label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={handleReturnDateChange}
                    min={departureDate}
                  />
                </div>
              )}
            </div>

            <button type="submit" className="search-btn">
              Buscar vuelos
            </button>
          </form>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="popular-destinations">
        <h2>Promociones</h2>
        <div className="destinations-grid">
          {popularDestinations.map((dest, index) => (
            <div
              key={index}
              className="destination-card"
              onClick={() => handleDestinationClick(dest)}
            >
              <div
                className="destination-image"
                style={{ backgroundImage: `url(${dest.image})` }}
              ></div>
              <h3>{dest.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Aerolínea. Todos los derechos reservados.</p>
      </footer>

      {/* Modal para información del destino */}
      {showModal && selectedDestination && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="destination-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <div className="modal-header">
              <h2>{selectedDestination.name}</h2>
              <div
                className="destination-image-modal"
                style={{ backgroundImage: `url(${selectedDestination.image})` }}
              ></div>
            </div>
            <div className="modal-content">
              <p className="destination-description">
                {selectedDestination.description}
              </p>

              <div className="destination-details">
                <div className="detail-item">
                  <span className="detail-label">Precio:</span>
                  <span className="detail-value">
                    {selectedDestination.price}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Duración del vuelo:</span>
                  <span className="detail-value">
                    {selectedDestination.duration}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Fecha de promocion:</span>
                  <span className="detail-value">
                    {selectedDestination.bestTime}
                  </span>
                </div>
              </div>

              <button
                className="choose-destination-btn"
                onClick={handleComingSoon}
              >
                Elegir promocion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
