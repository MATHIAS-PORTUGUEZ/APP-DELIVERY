import { useNavigate } from "react-router-dom";

export const Order = ({ id, client, amount, address = {}, km = 0, payment = '', isHistory = false }) => {
  const navigate = useNavigate();

  const handlerRedictMonitoring = () => {
    navigate("/monitoring-order/" + id);
  };

  const handlerViewNotes = (e) => {
    e.stopPropagation();
    if (isHistory) {
      navigate(`/ratings/${id}`);
      return;
    }
    navigate(`/order-notes/${id}`);
  };

  return (
    <div className="card-order" onClick={handlerRedictMonitoring}>
      <div className="card-order-name-summary">
        <span>{client}</span>
        <span>S/ {amount}</span>
      </div>
      <div className="card-order-details">
        <span>{address?.origin ?? 'Dirección origen'}</span>
        <div>
          <span>Distancia: </span>
          <span>{km}km</span>
        </div>
        <span>{address?.destination ?? 'Dirección destino'}</span>
        <span></span>
      </div>
      {payment ? (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
          <div className="payment-badge">Forma de pago: {payment}</div>
        </div>
      ) : null}

      <div className="card-order-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '.5rem' }}>
        <button className="btn btn-create-account" onClick={handlerViewNotes}>{isHistory ? 'Comentarios del cliente' : 'Notas del pedido'}</button>
      </div>
    </div>
  );
};
