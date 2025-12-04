import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/Profile.css';

export const OrderNotes = () => {
    const { id } = useParams();
    const [notes, setNotes] = useState([]);
    const [orderClient, setOrderClient] = useState('');

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await fetch('/data.json');
                if (!res.ok) return;
                const { data } = await res.json();
                const order = data.find((o) => String(o.id) === String(id));
                if (order) {
                    setNotes(order.notes || []);
                    setOrderClient(order.client || '');
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchNotes();
    }, [id]);

    return (
        <div className="page">
            <div className="header-profile">
                <span className="header-profile-name color-orange">Chaskys</span>
                <span className="header-profile-subname">Delivery app</span>
            </div>

            <section className="card notes-card">
                <h2>Notas del pedido {id ? `- ${orderClient}` : ''}</h2>
                <div style={{ marginTop: 12 }}>
                    {notes.length === 0 ? (
                        <div>No hay notas para este pedido.</div>
                    ) : (
                        notes.map((n) => (
                            <div key={n.id} className="note-item" style={{ marginBottom: 12 }}>
                                <div className="note-author">{n.author}</div>
                                <div className="note-text">{n.text}</div>
                            </div>
                        ))
                    )}
                </div>

                <div className="actions" style={{ marginTop: 20 }}>
                    <Link to="/home" className="btn btn-create-account">Volver</Link>
                </div>
            </section>
        </div>
    );
};

export default OrderNotes;
