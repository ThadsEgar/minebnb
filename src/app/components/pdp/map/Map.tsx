'use client'

import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('./DynamicMap'), {
  ssr: false,
  loading: () => <div>Loading map...</div>
});

const Map = () => {
  return <MapWithNoSSR />;
};

export default Map;