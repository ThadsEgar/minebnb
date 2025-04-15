'use client'

import React from 'react';
import { MapContainer, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DynamicMap = () => {
  const bounds = L.latLngBounds(
    L.latLng(-1000, -1000),
    L.latLng(1000, 1000)
  );

  return (
    <MapContainer 
        center={[0, 0]}
        zoom={3}
        style={{ height: '500px', width: '500px' }}
        maxBounds={bounds}
    >
      <ImageOverlay
        url="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/47195bf8-daeb-48ed-818b-79a5976234b9/d9kga3m-67f33299-e051-44cd-ab52-daf32d3c7e29.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQ3MTk1YmY4LWRhZWItNDhlZC04MThiLTc5YTU5NzYyMzRiOVwvZDlrZ2EzbS02N2YzMzI5OS1lMDUxLTQ0Y2QtYWI1Mi1kYWYzMmQzYzdlMjkuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.F9sVH9I1fpa98d2X1slWoFySbks6tGXm8dBR6bz9v1w"
        bounds={bounds}
      />
    </MapContainer>
  );
};

export default DynamicMap;