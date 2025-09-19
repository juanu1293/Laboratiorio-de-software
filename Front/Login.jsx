import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Función para redirigir al inicio al hacer clic en el logo
  const handleLogoClick = () => {
    navigate("/");
  };

  // Cargar email guardado si existe y verificar mensajes de éxito
  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }

    // Verificar si hay un mensaje de éxito en el estado de navegación
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      setError(""); // Limpiar cualquier error existente

      // Limpiar el mensaje después de 5 segundos
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    // Validaciones básicas
    if (!email || !password) {
      setError("Por favor completa todos los campos");
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor ingresa un email válido");
      setIsLoading(false);
      return;
    }

    try {
      // Simulamos una llamada a API con timeout
      setTimeout(() => {
        // Aquí normalmente verificarías con tu backend
        if (email === "usuario@ejemplo.com" && password === "password123") {
          // Guardar en localStorage si rememberMe está activado
          if (rememberMe) {
            localStorage.setItem("userEmail", email);
            localStorage.setItem("isLoggedIn", "true");
          } else {
            localStorage.removeItem("userEmail");
            sessionStorage.setItem("isLoggedIn", "true");
          }

          // Redirigir al home después de login exitoso
          navigate("/");
        } else {
          setError(
            "Credenciales incorrectas. Intenta con: usuario@ejemplo.com / password123"
          );
        }
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError("Error en el servidor. Intenta nuevamente.");
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleCreateAccount = () => {
    navigate("/register");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
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
        <button className="back-btn" onClick={handleBackToHome}>
          Volver al inicio
        </button>
      </header>

      <section className="login-section">
        <div className="login-container">
          <h2>Iniciar sesión</h2>
          <p className="login-subtitle">
            Accede a tu cuenta para gestionar tus reservas
          </p>

          {error && <div className="error-message">⚠️ {error}</div>}
          {successMessage && (
            <div className="success-message">✅ {successMessage}</div>
          )}

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

            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu contraseña"
                disabled={isLoading}
                className={error && !password ? "input-error" : ""}
              />
            </div>

            <div className="login-options">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                />
                <span className="checkmark"></span>
                Recordar mi cuenta
              </label>

              <a
                href="#forgot-password"
                onClick={handleForgotPassword}
                className="forgot-password-link"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className={`login-btn ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>

          <div className="login-divider">
            <span>¿No tienes cuenta con VivaSky? ¡Registrate ahora! </span>
          </div>

          <button
            className="create-account-btn"
            onClick={handleCreateAccount}
            disabled={isLoading}
          >
            Registrar usuario
          </button>

          <div className="demo-credentials">
            <p>Credenciales de demo:</p>
            <p>Email: usuario@ejemplo.com</p>
            <p>Contraseña: password123</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
