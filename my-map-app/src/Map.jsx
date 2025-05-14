import { useEffect, useRef } from "react";

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.H || mapRef.current.children.length > 0) return;

    const platform = new window.H.service.Platform({
      apikey: import.meta.env.YEFfCGxyR1MZyn6_Dyq_XxklF2y1qqJp,
    });

    const layers = platform.createDefaultLayers();
    const map = new window.H.Map(
      mapRef.current,
      layers.vector.normal.map,
      {
        center: { lat: 55.7558, lng: 37.6173 }, // Координаты (Москва)
        zoom: 10,
      }
    );

    new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
    window.H.ui.UI.createDefault(map, layers);

    return () => map.dispose();
  }, []);

  return <div ref={mapRef} className="w-full h-screen" />;
};

export default Map;