import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Register = () => {
  const [formData, setFormData] = useState({
    document: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    acceptTerms: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Función para redirigir al inicio al hacer clic en el logo
  const handleLogoClick = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    // Validar campos obligatorios
    if (
      !formData.document ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.birthDate ||
      !formData.gender ||
      !formData.phone ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.emergencyContactName ||
      !formData.emergencyContactPhone
    ) {
      setError("Por favor completa todos los campos obligatorios");
      return false;
    }

    // Validar formato de email
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Por favor ingresa un email válido");
      return false;
    }

    // Validar longitud de contraseña
    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }

    // Validar formato de teléfono (solo números)
    if (!/^\d+$/.test(formData.phone)) {
      setError("El teléfono debe contener solo números");
      return false;
    }

    // Validar formato de teléfono de emergencia (solo números)
    if (!/^\d+$/.test(formData.emergencyContactPhone)) {
      setError("El teléfono de emergencia debe contener solo números");
      return false;
    }

    // Validar que se acepten los términos
    if (!formData.acceptTerms) {
      setError("Debes aceptar los términos y condiciones");
      return false;
    }

    // Validar fecha de nacimiento (debe ser en el pasado)
    const birthDate = new Date(formData.birthDate);
    const today = new Date();
    if (birthDate >= today) {
      setError("La fecha de nacimiento debe ser una fecha pasada");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      // Simulamos una llamada a API con timeout
      setTimeout(() => {
        // Aquí normalmente enviarías los datos a tu backend para crear el usuario
        console.log("Datos de registro:", formData);

        // Simulamos registro exitoso
        // Podrías guardar el email si lo deseas
        localStorage.setItem("userEmail", formData.email);

        // Redirigir al login después de registro exitoso
        navigate("/login", {
          state: { message: "Registro exitoso. Ahora puedes iniciar sesión." },
        });

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

  // Obtener la fecha máxima para la fecha de nacimiento (hoy)
  const today = new Date().toISOString().split("T")[0];

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
        <div className="login-container horizontal-form">
          <h2>Registrese en VivaSky</h2>
          <p className="login-subtitle">
            Descubra un mundo nuevo, conozca distintos lugares y viva la
            experiencia VivaSky
          </p>

          {error && <div className="error-message">⚠️ {error}</div>}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-columns">
              {/* Columna izquierda */}
              <div className="form-column">
                {/* Documento */}
                <div className="input-group">
                  <label htmlFor="document">Documento de identidad *</label>
                  <input
                    id="document"
                    name="document"
                    type="text"
                    value={formData.document}
                    onChange={handleChange}
                    placeholder="Número de documento"
                    disabled={isLoading}
                    className={error && !formData.document ? "input-error" : ""}
                  />
                </div>

                {/* Nombres y Apellidos en la misma fila */}
                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="firstName">Nombres *</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Tus nombres"
                      disabled={isLoading}
                      className={
                        error && !formData.firstName ? "input-error" : ""
                      }
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="lastName">Apellidos *</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Tus apellidos"
                      disabled={isLoading}
                      className={
                        error && !formData.lastName ? "input-error" : ""
                      }
                    />
                  </div>
                </div>

                {/* Fecha de nacimiento y Género en la misma fila */}
                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="birthDate">Fecha de nacimiento *</label>
                    <div className="date-input-container">
                      <input
                        id="birthDate"
                        name="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={handleChange}
                        max={today}
                        disabled={isLoading}
                        className={
                          error && !formData.birthDate ? "input-error" : ""
                        }
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label htmlFor="gender">Género *</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={error && !formData.gender ? "input-error" : ""}
                    >
                      <option value="">Selecciona tu género</option>
                      <option value="male">Masculino</option>
                      <option value="female">Femenino</option>
                      <option value="other">Otro</option>
                      <option value="prefer_not_to_say">
                        Prefiero no decir
                      </option>
                    </select>
                  </div>
                </div>

                {/* Teléfono */}
                <div className="input-group">
                  <label htmlFor="phone">Teléfono *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Número de teléfono"
                    disabled={isLoading}
                    className={error && !formData.phone ? "input-error" : ""}
                  />
                </div>
              </div>

              {/* Columna derecha */}
              <div className="form-column">
                {/* Correo electrónico */}
                <div className="input-group">
                  <label htmlFor="email">Correo electrónico *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu.email@ejemplo.com"
                    disabled={isLoading}
                    className={error && !formData.email ? "input-error" : ""}
                  />
                </div>

                {/* Contraseña y Confirmar contraseña en la misma fila */}
                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="password">Contraseña *</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Crea una contraseña"
                      disabled={isLoading}
                      className={
                        error && !formData.password ? "input-error" : ""
                      }
                    />
                    <small className="password-hint">Mínimo 6 caracteres</small>
                  </div>

                  <div className="input-group">
                    <label htmlFor="confirmPassword">
                      Confirmar contraseña *
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Repite tu contraseña"
                      disabled={isLoading}
                      className={
                        error && !formData.confirmPassword ? "input-error" : ""
                      }
                    />
                  </div>
                </div>

                {/* Información de contacto de emergencia */}
                <div className="form-section-divider">
                  <h3>Contacto de emergencia</h3>
                </div>

                {/* Nombre y Teléfono de contacto en la misma fila */}
                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="emergencyContactName">
                      Nombre del contacto *
                    </label>
                    <input
                      id="emergencyContactName"
                      name="emergencyContactName"
                      type="text"
                      value={formData.emergencyContactName}
                      onChange={handleChange}
                      placeholder="Nombre completo"
                      disabled={isLoading}
                      className={
                        error && !formData.emergencyContactName
                          ? "input-error"
                          : ""
                      }
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="emergencyContactPhone">
                      Teléfono del contacto *
                    </label>
                    <input
                      id="emergencyContactPhone"
                      name="emergencyContactPhone"
                      type="tel"
                      value={formData.emergencyContactPhone}
                      onChange={handleChange}
                      placeholder="Número de teléfono"
                      disabled={isLoading}
                      className={
                        error && !formData.emergencyContactPhone
                          ? "input-error"
                          : ""
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Términos y condiciones */}
            <div className="input-group checkbox-group">
              <label className="checkbox-container">
                <input
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <span className="checkmark"></span>
                Acepto los{" "}
                <a href="#terms" className="terms-link">
                  términos y condiciones
                </a>{" "}
                y la{" "}
                <a href="#privacy" className="terms-link">
                  política de privacidad
                </a>
              </label>
            </div>

            <button
              type="submit"
              className={`login-btn ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Creando cuenta...
                </>
              ) : (
                "Registrarse"
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Register;
