'use client'
import './DynamicMap.css';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';

const mapStyles = {
  openStreetMap: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },
  stamenWatercolor: {
    url: "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  },
  cartoDBVoyager: {
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }
};

const DynamicMapContainer = () => {
  return (
    <div className="dynamicmap__container">
      <h2 className="dynamicmap__header">Coordinates</h2>
      <DynamicMap />
    </div>
  )
}

const DynamicMap = ({ 
  center = [51.505, -0.09] as LatLngExpression, 
  zoom = 13,
  style = "openStreetMap"
}) => {
  const selectedStyle = mapStyles[style] || mapStyles.openStreetMap;
  return (
    <MapContainer 
      center={center}
      zoom={zoom}
      style={{ height: '400px', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution={selectedStyle.attribution}
        url={selectedStyle.url}
      />
    </MapContainer>
  );
};

export default DynamicMapContainer;