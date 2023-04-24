import React from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import './Map.css';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '4px',
};

const zoom = 13;

const GMaps = ({ cood, setCood }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GMAPS,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className="gmaps">
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={{ mapId: '36a8bbd50e48e368' }}
        center={cood}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={(_) => {
          setCood(JSON.parse(JSON.stringify(_.latLng)));
        }}
      >
        <MarkerF position={cood} />
      </GoogleMap>
    </div>
  ) : (
    <div className="gmaps__error">
      <p>Google Maps could not be loaded</p>
    </div>
  );
};

export default React.memo(GMaps);
