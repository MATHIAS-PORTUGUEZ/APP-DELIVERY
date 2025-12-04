import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterDocuments.css";
import { LogoChaskys } from "../components/LogoChaskys";

export const RegisterDocuments = () => {
  const [license, setLicense] = useState(null);
  const [dni, setDni] = useState(null);
  const [card, setCard] = useState(null);
  const navigate = useNavigate();

  const onFile = (setter) => (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) setter(file);
  };

  const allFilled = license && dni && card;

  const handleNext = () => {
    if (!allFilled) {
      alert("Por favor sube los 3 documentos antes de continuar");
      return;
    }
    // continuar flujo
    navigate("/register-suc");
  };

  return (
    <div className="register-page documents-page">
      <LogoChaskys descripcion={"Registro Delivery app"} />

      <div className="docs-list">
        <label className={`doc-btn ${license ? "filled" : ""}`}>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={onFile(setLicense)}
          />
          <div className="doc-text">
            <div className="doc-title">Licencia de conducir</div>
            {license && <div className="doc-name">{license.name}</div>}
          </div>
        </label>

        <label className={`doc-btn ${dni ? "filled" : ""}`}>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={onFile(setDni)}
          />
          <div className="doc-text">
            <div className="doc-title">Foto de DNI</div>
            {dni && <div className="doc-name">{dni.name}</div>}
          </div>
        </label>

        <label className={`doc-btn ${card ? "filled" : ""}`}>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={onFile(setCard)}
          />
          <div className="doc-text">
            <div className="doc-title">Tarjeta del carro</div>
            {card && <div className="doc-name">{card.name}</div>}
          </div>
        </label>
      </div>

      <div className="bottom-card docs-bottom">
        <button
          className="next"
          type="button"
          onClick={handleNext}
          disabled={!allFilled}
          title={
            !allFilled
              ? "Sube los documentos antes de continuar"
              : "Siguiente"
          }
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};