import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterCel.css";
import { LogoChaskys } from "../components/LogoChaskys";

export const RegisterCel = () => {
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState(null);
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleMethodSelect = (selectedMethod) => {
    setMethod(selectedMethod);
    sendCode(selectedMethod);
  };

  const sendCode = (selectedMethod) => {
    if (!phone.trim()) {
      alert("Por favor ingresa un número de teléfono");
      return;
    }
    // Generar código aleatorio de 4 dígitos
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    setVerificationCode(randomCode);
    setCodeSent(true);
    alert(`Código enviado por ${selectedMethod === "whatsapp" ? "WhatsApp" : "SMS"}: ${randomCode}`);
  };

  const handleVerifyCode = () => {
    if (!code.trim()) {
      alert("Por favor ingresa el código");
      return;
    }
    if (code === verificationCode) {
      alert("¡Código verificado correctamente!");
      navigate("/register-doc");
    } else {
      alert("Código incorrecto. Intenta de nuevo.");
      setCode("");
    }
  };

  const handleResendCode = () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    setVerificationCode(randomCode);
    alert(`Código reenviado por ${method === "whatsapp" ? "WhatsApp" : "SMS"}: ${randomCode}`);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 9);
    setPhone(value);
  };

  return (
    <div className="register-page">
      <LogoChaskys descripcion={"Registro Delivery app"} />
      
      {!codeSent ? (
        <>
          <div className="phone-row">
            <button className="country" type="button">+51</button>
            <input
              className="phone"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Número de teléfono"
              inputMode="numeric"
            />
          </div>

          <div className="methods">
            <button
              className={`btn whatsapp ${method === "whatsapp" ? "active" : ""}`}
              type="button"
              onClick={() => handleMethodSelect("whatsapp")}
            >
              WhatsApp
            </button>
            <button
              className={`btn sms ${method === "sms" ? "active" : ""}`}
              type="button"
              onClick={() => handleMethodSelect("sms")}
            >
              SMS
            </button>
          </div>

          <p className="disclaimer">
            Al continuar, aceptas automáticamente nuestras Condiciones, Políticas de
            privacidad y Política de cookies.
          </p>

          <div className="bottom-card">
            <button className="next" type="button" disabled>
              Siguiente
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="send-info">
            Código enviado por <strong>{method === "whatsapp" ? "WhatsApp" : "SMS"}</strong> al +51 {phone}
          </p>

          <div className="phone-row-2">
            <input
              className="phone"
              type="tel"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="Ingresa el código"
              inputMode="numeric"
              maxLength="4"
            />
          </div>

          <div className="bottom-card">
            <button className="next" type="button" onClick={handleVerifyCode}>
              Verificar
            </button>
            <button className="resend" type="button" onClick={handleResendCode}>
              Reenviar código
            </button>
          </div>
        </>
      )}
    </div>
  );
};


