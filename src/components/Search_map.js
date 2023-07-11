import React, { useEffect, useRef,useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';
import Overlay from 'ol/Overlay';

const MapComponent = ({setlat}) => {
  
  const mapRef = useRef(null);
  const markerOverlayRef = useRef(null);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    const markerOverlay = new Overlay({
      element: markerOverlayRef.current,
      positioning: 'center-center',
      stopEvent: false,
      offset: [0, -10],
    });

    map.addOverlay(markerOverlay);

    map.on('click', (event) => {
      const coordinates = toLonLat(event.coordinate);
      const latitude = coordinates[1];
      const longitude = coordinates[0];

      markerOverlay.setPosition(event.coordinate);
      setlat(previousState => {
        return { ...previousState, latitude: latitude,longitude:longitude }
      });
      console.log('Latitude:', latitude);
      console.log('Longitude:', longitude);
    });

    return () => {
      map.setTarget(null);
    };
  }, []);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }} ref={mapRef}></div>
      <div id="marker" style={{ display: 'none' }} ref={markerOverlayRef}>
        <img src="marker.png" alt="Marker" />
      </div>
    </div>
  );
};

export default MapComponent;
