import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email) {
      setError("Por favor ingresa tu correo electrónico");
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor ingresa un email válido");
      setIsLoading(false);
      return;
    }

    // Simulamos el envío de instrucciones
    setTimeout(() => {
      setIsLoading(false);
      // Redirigir a la página de cambio de contraseña con el email
      navigate("/change-password", { state: { email } });
    }, 1500);
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="app">
      <header className="header">
        <div
          className="logo-container"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          <img
            src="https://i.pinimg.com/736x/60/48/b4/6048b4ae7f74724389d345767e8061a0.jpg"
            alt="VivaSky Logo"
            className="logo-image"
          />
          <span className="logo-text">VivaSky</span>
        </div>
        <button className="back-btn" onClick={handleBackToLogin}>
          Volver al login
        </button>
      </header>

      <section className="login-section">
        <div className="login-container">
          <h2>Recuperar contraseña</h2>
          <p className="login-subtitle">
            Ingresa tu correo electrónico para restablecer tu contraseña
          </p>

          {error && <div className="error-message">⚠️ {error}</div>}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.email@ejemplo.com"
                disabled={isLoading}
                className={error && !email ? "input-error" : ""}
              />
            </div>

            <button
              type="submit"
              className={`login-btn ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Enviando instrucciones...
                </>
              ) : (
                "Enviar instrucciones"
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
