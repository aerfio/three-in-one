import React from "react";
import { connect, ConnectedProps } from 'react-redux';

import { Place } from "../../services/Places/types";

import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngTuple } from "leaflet";

import PlaceCard from "./PlaceCard";

type Props = ConnectedProps<typeof connector>

const Map: React.FunctionComponent<Props> = ({
  places,
  selectedPlace,
}) => {
  if (!places || !places.length) {
    return null;
  }

  const openPopup = (marker: any, place: Place) => {
    if (
      marker && 
      marker.leafletElement &&
      selectedPlace &&
      selectedPlace.id === place.id
    ) {
      marker.leafletElement.openPopup()
    }
  }

  return (
    <LeafletMap
      zoom={7}
      center={[50.298, 18.6965]}
      style={{ height: "400px", width: "600px" }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((place: Place, id: number) => (
        <Marker
          position={[place.location.lat, place.location.lng] as LatLngTuple}
          ref={(marker) => openPopup(marker, place)}
          key={id}
        >
          <Popup minWidth={90}>
            <PlaceCard place={place} />
          </Popup>
        </Marker>
      ))}
    </LeafletMap>
  );
};

const mapState = (state: any) => ({
  places: state.discover.places,
  selectedPlace: state.discover.place,
})

const connector = connect(
  mapState,
)
export default connector(Map);
