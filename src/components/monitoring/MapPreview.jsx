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

  const [originAddress, setOriginAddress] = useState("Santa Anita, Peru");
  const [destinationAddress, setDestinationAddress] = useState("Mal de Sur, Peru");
  const [geocodingError, setGeocodingError] = useState("");

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

  // Geocode helper using Mapbox Geocoding API
  const geocode = async (text) => {
    if (!mapboxgl.accessToken || mapboxgl.accessToken === "CHANGEME") {
      throw new Error("Mapbox token not configured");
    }
    const q = encodeURIComponent(text);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${q}.json?access_token=${mapboxgl.accessToken}&limit=1`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.features || data.features.length === 0) return null;
    const [lng, lat] = data.features[0].center;
    return [lng, lat];
  };

  const handleShowRoute = async () => {
    setGeocodingError("");
    try {
      const o = await geocode(originAddress);
      const d = await geocode(destinationAddress);
      if (!o || !d) {
        setGeocodingError("No se pudieron geocodificar una o ambas direcciones.");
        return;
      }
      setOrder((prev) => ({ ...prev, origin: o, destination: d }));
    } catch (err) {
      console.error(err);
      setGeocodingError(err.message || "Error al geocodificar");
    }
  };

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

      {/* Address inputs to geocode and show route */}
      <div className="map-controls" style={{ margin: '8px 0' }}>
        <input
          type="text"
          value={originAddress}
          onChange={(e) => setOriginAddress(e.target.value)}
          placeholder="Origin address (ej: Santa Anita, Peru)"
          style={{ width: '48%', marginRight: '4%', padding: '8px' }}
        />
        <input
          type="text"
          value={destinationAddress}
          onChange={(e) => setDestinationAddress(e.target.value)}
          placeholder="Destination address (ej: Mal de Sur, Peru)"
          style={{ width: '48%', padding: '8px' }}
        />
        <div style={{ marginTop: 8 }}>
          <button onClick={handleShowRoute} className="btn-accept">Mostrar ruta</button>
          {geocodingError ? (
            <div style={{ color: 'red', marginTop: 6 }}>{geocodingError}</div>
          ) : null}
        </div>

        {order.id ? (
          <div className="map" style={{ display: isLoading ? "none" : "block" }}>
            <Map mOrigin={order.origin} mDestination={order.destination} />
          </div>
        ) : (
          <div className="map" style={{ display: isLoading ? "none" : "block" }}>
            <Map mOrigin={order.origin} mDestination={order.destination} />
          </div>
        )}
      </div>

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
