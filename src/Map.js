import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import './Map.css';

const containerStyle = {
  width: '80%',
  height: '500px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function GMaps() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GMAPS
  })

  console.log("TEST", process.env.REACT_APP_GMAPS)

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

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
        zoom={4}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </div>
  ) : <></>
}

export default React.memo(GMaps)