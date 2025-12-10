import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Mapbox token from Vite environment variable
// Prefer VITE_CHAMGENE (professor requested name), fallback to VITE_MAPBOX_TOKEN
mapboxgl.accessToken = import.meta.env.VITE_CHAMGENE || import.meta.env.VITE_MAPBOX_TOKEN || "CHANGEME";

export const Map = ({ mOrigin, mDestination }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const currentLocationMarker = useRef(null);
    const [_currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        if (map.current) return;

        const origin = mOrigin ?? [-77.029842, -12.04574];
        const destination = mDestination ?? [-77.029842, -12.04574];

        // Make sure token is valid before creating the map
        if (!mapboxgl.accessToken || mapboxgl.accessToken === 'CHANGEME') {
            console.warn('Mapbox token not configured (set VITE_CHAMGENE on Vercel). Map will not be created.');
            return;
        }

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/standard",
            center: origin,
            zoom: 13,
        });

        map.current.on('load', () => {
            new mapboxgl.Marker({ color: '#10b981' })
                .setLngLat(origin)
                .setPopup(new mapboxgl.Popup().setHTML('<h3>Inicio del Pedido</h3>'))
                .addTo(map.current);

            new mapboxgl.Marker({ color: '#ef4444' })
                .setLngLat(destination)
                .setPopup(new mapboxgl.Popup().setHTML('<h3>Fin del Pedido</h3>'))
                .addTo(map.current);

            getRoute(origin, destination, 'route-blue', '#3b82f6');

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userLocation = [position.coords.longitude, position.coords.latitude];
                        setCurrentLocation(userLocation);

                        currentLocationMarker.current = new mapboxgl.Marker({ color: '#3b82f6' })
                            .setLngLat(userLocation)
                            .setPopup(new mapboxgl.Popup().setHTML('<h3>Tu ubicación</h3>'))
                            .addTo(map.current);

                        getRoute(userLocation, origin, 'route-orange', '#f97316');
                    },
                    (error) => {
                        console.error('Error obteniendo ubicación:', error);
                    }
                );
            }
        });

        return () => {
            map.current.remove();
        };
    }, [mOrigin, mDestination]);

    useEffect(() => {
        if (!map.current) return;

        const watchId = navigator.geolocation?.watchPosition(
            (position) => {
                const userLocation = [position.coords.longitude, position.coords.latitude];
                setCurrentLocation(userLocation);

                // Actualizar marcador de ubicación actual
                if (currentLocationMarker.current) {
                    currentLocationMarker.current.setLngLat(userLocation);
                }

                // Actualizar ruta naranja: Tu ubicación → Restaurante
                const origin = mOrigin;
                getRoute(userLocation, origin, 'route-orange', '#f97316');
            },
            (error) => {
                console.error('Error actualizando ubicación:', error);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );

        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, [mOrigin, mDestination]);

    const getRoute = async (start, end, routeId, color) => {
        const query = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
            { method: 'GET' }
        );
        const json = await query.json();
        const data = json.routes[0];
        const route = data.geometry.coordinates;

        const geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: route
            }
        };

        if (map.current.getSource(routeId)) {
            map.current.getSource(routeId).setData(geojson);
        } else {
            map.current.addLayer({
                id: routeId,
                type: 'line',
                source: {
                    type: 'geojson',
                    data: geojson
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': color,
                    'line-width': 5,
                    'line-opacity': 0.75
                }
            });
        }

        const bounds = new mapboxgl.LngLatBounds();
        route.forEach(coord => bounds.extend(coord));
        map.current.fitBounds(bounds, { padding: 50 });
    };


    return (
        <div ref={mapContainer} style={{ width: "100%", height: "500px" }} />
    );
};
