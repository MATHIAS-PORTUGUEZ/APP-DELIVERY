import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterSuccess.css";
import { LogoChaskys } from "../components/LogoChaskys";

export const RegisterSuccess = () => {
  const navigate = useNavigate();

  // Función para manejar el clic del botón (navega a la ruta principal "/")
  const handleContinue = () => {
    navigate("/home");
  };

  return (
    // Contenedor principal para el fondo verde
    <div className="register-page success-page"> 
      
      <LogoChaskys descripcion={"Registro Delivery app"} />

      {/* Tarjeta central flotante (color gris claro) */}
      <div className="success-card">
        <div className="icon-container">
          {/* El ícono de check (icon_check.svg) */}
          <img 
            src="icon_check.svg" // La ruta de la imagen SVG
            alt="Registro Exitoso" 
            className="icon-check-image" 
          />
        </div>
        
        {/* Texto de éxito */}
        <p className="success-message">Registro exitoso...!</p>
      </div>
      
      {/* Tarjeta inferior blanca con el botón "Siguiente" */}
      <div className="bottom-card success-bottom">
        <button
          className="next"
          type="button"
          onClick={handleContinue}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};