import { LogoChaskys } from "../components/LogoChaskys";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Register.css";

export const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    user: "",
    password: "",
    confirmPassword: "",
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    if (saved) setSaved(false);
  };

  const passwordsMatch = form.password === form.confirmPassword;
  const isFormValid = form.user.trim() !== "" && form.password !== "" && passwordsMatch;

  const handleSave = (e) => {
    e && e.preventDefault();
    if (!form.user.trim()) return alert("Ingresa un usuario");
    if (!form.password) return alert("Ingresa una contraseña");
    if (!passwordsMatch) return alert("Las contraseñas no coinciden");


    const payload = {
      user: form.user.trim(),
      password: form.password,
      savedAt: Date.now(),
    };
    localStorage.setItem("profile", JSON.stringify(payload));
    setSaved(true);
    alert("Datos guardados");
  };

  const handleNext = (e) => {
    e && e.preventDefault();
    if (!isFormValid) {
      return alert("Completa los campos correctamente antes de continuar");
    }
    if (!saved) {
      handleSave();
    }
    navigate("/register-cel");
  };

  return (
    <>
      <LogoChaskys descripcion={"Registro Delivery app"} />
      <section id="form">
        <form onSubmit={handleNext}>
          <div className="form-body">
            <input
              type="text"
              name="user"
              id="user"
              placeholder="Usuario"
              value={form.user}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repita Contraseña"
              value={form.confirmPassword}
              onChange={handleChange}
              onInput={(e) => e.target.setCustomValidity(form.password === e.target.value ? "" : "Las contraseñas no coinciden")}
              className="form-input"
              required
            />
            {!passwordsMatch && form.confirmPassword.length > 0 && (
              <div style={{ color: "#C8A758", fontSize: 20, marginTop: 6, fontFamily: "arial" }}> * La contraseña no coincide</div>
            )}
          </div>

          <div className="accion-register">

            <button
              type="submit"
              className="btn btn-create-account"
              style={{ marginLeft: 12 }}
            >
              Siguiente
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
