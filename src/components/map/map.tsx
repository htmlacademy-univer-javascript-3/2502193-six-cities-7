import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { City, Offer } from '../../types/offer';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: Offer[];
  selectedPoint?: string | null;
  className?: string;
};

const defaultCustomIcon = new Icon({ iconUrl: 'img/pin.svg', iconSize: [27, 39], iconAnchor: [13.5, 39] });
const currentCustomIcon = new Icon({ iconUrl: 'img/pin-active.svg', iconSize: [27, 39], iconAnchor: [13.5, 39] });

function Map({ city, offers, selectedPoint, className = 'cities__map' }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({ lat: offer.location.latitude, lng: offer.location.longitude });
        marker.setIcon(selectedPoint !== undefined && offer.id === selectedPoint ? currentCustomIcon : defaultCustomIcon)
          .addTo(markerLayer);
      });
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedPoint]);

  return <section className={`${className} map`} ref={mapRef}></section>;
}

export default Map;
