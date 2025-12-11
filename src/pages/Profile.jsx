import { HaderProfile } from '../components/profile/Hader'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/Profile.css";

export const Profile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({ name: '', phone: '', user: '', password: '', photo: '' });
    const [savedSuccess, setSavedSuccess] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('profile');
            if (stored) setProfile(JSON.parse(stored));
        } catch (err) { }
    }, []);

    const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

    const handleSave = () => {
        localStorage.setItem('profile', JSON.stringify(profile));
        setSavedSuccess(true);
        setTimeout(() => {
            setSavedSuccess(false);
            navigate('/home');
        }, 2000);
    }

    const handleLogout = () => {
        navigate('/login');
    }

    const handlePhoto = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setProfile({ ...profile, photo: reader.result });
        reader.readAsDataURL(file);
    }

    return (
        <div>
            <HaderProfile></HaderProfile>
            <section className="card profile-form">
                <h2>Perfil</h2>
                <div className="profile-row">
                    <label>Nombre</label>
                    <input name="name" value={profile.name} onChange={handleChange} />
                </div>
                <div className="profile-row">
                    <label>Teléfono</label>
                    <input name="phone" value={profile.phone} onChange={handleChange} />
                </div>
                <div className="profile-row">
                    <label>Usuario</label>
                    <input name="user" value={profile.user} onChange={handleChange} />
                </div>
                <div className="profile-row">
                    <label>Contraseña</label>
                    <input name="password" type="password" value={profile.password} onChange={handleChange} />
                </div>
                <div className="profile-row">
                    <label>Foto de perfil</label>
                    <input type="file" accept="image/*" onChange={handlePhoto} />
                    {profile.photo && <img src={profile.photo} alt="foto" className="profile-photo-preview" />}
                </div>
                <div className="profile-actions">
                    <button className="btn btn-accept" onClick={handleSave}>Guardar</button>
                    <button className="btn btn-logout" onClick={handleLogout}>Cerrar Sesión</button>
                </div>
                {savedSuccess && (
                    <div className="profile-success-message">
                        ✓ Guardado exitosamente
                    </div>
                )}
            </section>
        </div>
    )
}