import { useState, useEffect } from "react";
import { LogoChaskys } from "../components/LogoChaskys";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Cargar usuario y contraseña guardados al montar el componente
  useEffect(() => {
    try {
      const stored = localStorage.getItem('profile');
      if (stored) {
        const profile = JSON.parse(stored);
        if (profile.user && profile.password) {
          setUser(profile.user);
          setPassword(profile.password);
          // Auto-login después de cargar los datos
          setTimeout(() => {
            handleAutoLogin(profile.user, profile.password);
          }, 500);
        }
      }
    } catch (err) { }
  }, []);

  const handleAutoLogin = (username, pass) => {
    // Validar con la cuenta guardada
    if (username && pass) {
      navigate("/home");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validUser = "admin";
    const validPassword = "123456";

    // Primero intenta con la cuenta guardada en localStorage
    try {
      const stored = localStorage.getItem('profile');
      if (stored) {
        const profile = JSON.parse(stored);
        if (user === profile.user && password === profile.password) {
          navigate("/home");
          return;
        }
      }
    } catch (err) { }

    // Si no coincide con la guardada, intenta con la cuenta por defecto
    if (user === validUser && password === validPassword) {
      navigate("/home");
    }
  };

  return (
    <>
      <LogoChaskys descripcion={"Delivery app"} />

      <form onSubmit={handleSubmit} className="login-form">
        <section className="inputs-form">
          <input
            type="text"
            name="user"
            id="user"
            placeholder="Usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </section>

        <section className="accion-login">
          <span>¿Olvidaste tu contraseña?</span>
          <button type="submit" className="btn btn-login">
            Iniciar Sesión
          </button>
          <span>o</span>
          <Link to="/register" className="btn btn-create-account">
            Crea una cuenta
          </Link>
        </section>
      </form>
    </>
  );
};
