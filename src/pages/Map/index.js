import { Container, Grid } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";
const Map = () => {
    //latitud y longitud de lima -12.04318, -77.02824
    const position = [-12.04318, -77.02824];
    const markerIcon = new L.icon({
        iconUrl: require("../../assets/marker.png"),
        iconSize: [30, 30],
    });
    //Lista de lugares
    const lugares = [
        {
            nombre: "Parque de las aguas",
            coordenadas: [-12.0943025, -77.0048953],
        },
        {
            nombre: "Palacio de la Exposicion",
            coordenadas: [-12.0599468, -77.0368597],
        },
        {
            nombre: "Estadio Monumental",
            coordenadas: [-12.055685399248642, -76.93600517319747],
        },
        {
            nombre: "zoologico de huachipa",
            coordenadas: [-12.015033, -76.9004835],
        },
        {
            nombre: "Museo de Arte Contemporáneo - Lima",
            coordenadas: [-12.1370749, -77.0238592],
        },
    ];

    function LocationMarker(){
        const[position,setPosition] = useState(null);
        const map = useMapEvents({
            click(){
                map.locate();
            },
            locationfound(e){
                setPosition(e.latlng);
                console.log(e.latlng);
                map.flyTo(e.latlng, map.getZoom());
            }
        });
        return position ==null ? null :(
            <Marker position={position} icon={markerIcon}>
                <Popup>You are here</Popup>
            </Marker>
        );
    }

    return (
        <Container maxWidth="lg">
            <Grid container>
                <Grid item md={12}>
                    <h1>Mapas</h1>
                </Grid>
                <Grid item md={12}>
                    <MapContainer center={position} zoom={12} style={{ height: 500 }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {/*<Marker position={[-12.055771192382348, -76.96303876290358]}
                            icon={markerIcon}>
                            <Popup>Tecsup Centro Educativo</Popup>
                        </Marker>
                        */}
                        {lugares.map((lugar)=>(
                            <Marker position={lugar.coordenadas} icon={markerIcon}>
                                <Popup>{lugar.nombre}</Popup>
                            </Marker>
                        ))},
                        <LocationMarker/>
                    </MapContainer>
                </Grid>
            </Grid>
        </Container>
    );
};
export default Map;