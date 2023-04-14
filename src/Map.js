import React from 'react'
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import './Map.css';

const containerStyle = {
  width: '80%',
  height: '500px'
};

const center = { lat: -34.397, lng: 150.644 };
const zoom = 4;

const GMaps = ({ cood, setCood }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GMAPS
  })

  const [map, setMap] = React.useState(null)
  
  const onLoad = React.useCallback(function callback(map) {
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <div className="gmaps">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={(_) => {
            setCood(JSON.parse(JSON.stringify(_.latLng)))
        }}
  
      >
        <MarkerF
          position={cood}
        />
        <></>
      </GoogleMap>
    </div>
  ) : <></>
}

export default React.memo(GMaps)