import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

export const HeaderHome = () => {

  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('profile');
      if (stored) setProfile(JSON.parse(stored));
    } catch (err) {
      // ignore
    }
  }, []);

  const handlerRedictProfile = () => {
    navigate("/profile")
  }

  return (
    <section className="header-home">
      <div className="hader-user">
        <button
          className="header-user-avatar"
          onClick={handlerRedictProfile}
          aria-label="Ir a perfil"
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            padding: 0,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer'
          }}
        >
          {profile?.photo ? (
            <img
              src={profile.photo}
              alt="Foto de perfil"
              className="header-user-photo"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <circle cx="12" cy="12" r="12" fill="#e0e0e0" />
              <circle cx="12" cy="8" r="4" fill="#fff" />
              <rect x="6" y="14" width="12" height="6" rx="3" fill="#fff" />
            </svg>
          )}
        </button>
      </div>

      <div className="header-logo">
        <span className="header-logo-name color-orange">Chaskys</span>
        <span className="header-logo-subname">Delivery app</span>
      </div>
    </section>
  );
};
