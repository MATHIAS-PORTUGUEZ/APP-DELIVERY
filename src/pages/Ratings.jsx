import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/Profile.css';

export const Ratings = () => {
    const { id } = useParams();

    // Cargar calificaciones desde data.json para la orden específica
    const [ratings, setRatings] = React.useState([]);

    React.useEffect(() => {
        const fetchRatings = async () => {
            try {
                const res = await fetch('/data.json');
                if (!res.ok) return;
                const json = await res.json();
                const order = json.data.find((o) => String(o.id) === String(id));
                if (order) setRatings(order.ratings || []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchRatings();
    }, [id]);

    return (
        <div className="page">
            <div className="header-profile">
                <span className="header-profile-name color-orange">Chaskys</span>
                <span className="header-profile-subname">Delivery app</span>
            </div>

            <section className="card ratings-card">
                <h2>Mis Calificaciones {id ? `- Orden ${id}` : ''}</h2>
                <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center', gap: 8 }}>
                    {(() => {
                        const avg = ratings.length ? Math.round(ratings.reduce((s, r) => s + r.stars, 0) / ratings.length) : 0;
                        return Array.from({ length: avg }).map((_, i) => (
                            <span key={i} className="big-star">★</span>
                        ));
                    })()}
                </div>

                <div className="ratings-list">
                    {ratings.map((r) => (
                        <div key={r.id} className="rating-card">
                            <div className="rating-card-top">
                                <span className="rating-author">{r.author}</span>
                                <span className="rating-stars">
                                    {Array.from({ length: r.stars }).map((_, i) => (
                                        <span key={i} className="rating-star">★</span>
                                    ))}
                                </span>
                            </div>
                            <div className="rating-text">{r.text}</div>
                        </div>
                    ))}
                </div>

                <div className="actions">
                    <Link to="/home" className="btn btn-create-account">Volver</Link>
                </div>
            </section>
        </div>
    );
};

export default Ratings;
