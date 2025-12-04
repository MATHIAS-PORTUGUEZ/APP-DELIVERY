import { Order } from "../home/oders/Order";
import { Map } from "../shared/Map";
export const MapConfirmMonitoring = () => {
    return (
        <section className="card monitoring">
            <div className="btns-map-confirm">
                <button className="btn-accept" style={{ minWidth: "250px" }}>Pedido entregado</button>
                <img src="./call.svg" alt="llamar" />
            </div>
            <Order
                id={1}
                client={'Jorge Pérez'}
                amount={'10.20'}
                address={{ origin: 'Av. Arequipa 123', destination: 'Calle Los Pinos 567' }}
                km={10}
                payment={'Efectivo'}
            />
            <div className="map">
                <Map mOrigin={[-77.030867, -12.054139]} mDestination={[-77.036712, -12.042828]} />
            </div>
        </section>
    );
};
