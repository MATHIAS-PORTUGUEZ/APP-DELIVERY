import { useEffect, useState } from "react";
import { Order } from "./oders/Order";

export const OdersHome = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          alert("no se encontr el archivo");
        }
        const { data } = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="card order-home">
      <div className="order-home-title">
        <span>PEDIDOS DISPONIBLES</span>
      </div>
      {orders.map(({ id, client, amount, address, km, payment }) => (
        <Order
          key={id}
          id={id}
          client={client}
          amount={amount}
          address={address}
          km={km}
          payment={payment}
        />
      ))}
    </section>
  );
};
