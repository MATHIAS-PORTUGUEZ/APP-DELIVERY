import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Order } from "../home/oders/Order";
import { Map } from "../shared/Map";


mapboxgl.accessToken = import.meta.env.VITE_CHAMGENE || import.meta.env.VITE_MAPBOX_TOKEN || "CHANGEME";

export const MapMonitoring = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(5);

  const [order, setOrder] = useState({
    id: 0,
    client: "",
    amount: "",
    address: {
      origin: "",
      destination: "",
    },
    origin: [-77.029842, -12.04574],
    destination: [-77.029842, -12.04574],
    km: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          alert("no se encontr el archivo");
        }
        const { data } = await response.json();
        const findOrder = data.find((e) => e.id == id);
        setOrder(findOrder);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const navigate = useNavigate();

  const handlerCancel = () => {
    navigate("/home");
  };

  const intervalRef = useRef(null);

  const handlerAccept = () => {
    setIsLoading(true);
    setCount(5);
    intervalRef.current = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(intervalRef.current);
          setIsLoading(false);
          navigate("/confirm-order");
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  return (
    <section className="card monitoring">
      <Order
        id={order.id}
        address={order.address}
        amount={order.amount}
        client={order.client}
        km={order.km}
        payment={order.payment}
      />

      <div
        className="loagin-accept"
        style={{ display: isLoading ? "flex" : "none" }}
      >
        <img src="/cargando.svg" alt="" />
        <span>Aceptando carrera...!</span>
        <span>{count}s</span>
      </div>

      {order.id ? (
        <div className="map" style={{ display: isLoading ? "none" : "block" }}>
          <Map mOrigin={order.origin} mDestination={order.destination} />
        </div>
      ) : (
        <div></div>
      )}

      <div className="btns-monitoring">
        <button
          className="btn-cancel"
          style={isLoading ? { width: "100%" } : {}}
          onClick={handlerCancel}
        >
          Cancelar
        </button>
        <button
          className="btn-accept"
          style={isLoading ? { display: "none" } : {}}
          onClick={handlerAccept}
        >
          Aceptar
        </button>
      </div>
    </section>
  );
};
