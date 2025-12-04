import { Order } from './oders/Order'
import { useEffect, useState } from 'react'

export const HistorialHome = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          console.warn('No se encontró el archivo');
          return;
        }
        const { data } = await response.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="card order-home">
      <div className="order-home-title">
        <span>HISTORIAL DE  PEDIDOS</span>
      </div>
      {orders.map(({ id, client, amount, address, km, payment }) => (
        <Order key={id} id={id} client={client} amount={amount} address={address} km={km} payment={payment} isHistory={true} />
      ))}
    </section>
  );
};
