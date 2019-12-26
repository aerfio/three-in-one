import React, { FC, useState } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngTuple } from "leaflet";

export const Map: FC = () => {
  const position: LatLngTuple = [50.298, 18.6965];
  const [markersPosition, setMarkersPosition] = useState<LatLngTuple[]>([
    position,
  ]);

  return (
    <LeafletMap
      center={position}
      zoom={13}
      style={{ height: "100vh", width: "100vw" }}
      onclick={({ latlng }) =>
        setMarkersPosition(mrk => mrk.concat([[latlng.lat, latlng.lng]]))
      }
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markersPosition.map((elem, id) => (
        <Marker
          draggable={true}
          position={elem}
          ondragend={console.log}
          key={id}
        >
          <Popup minWidth={90}>
            <span>
              lat: {elem[0]}
              lng: {elem[1]}
            </span>
          </Popup>
        </Marker>
      ))}
    </LeafletMap>
  );
};
