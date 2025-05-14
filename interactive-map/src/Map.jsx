import { useEffect } from "react";
import "../styles.css";

const Map = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js";
    document.body.appendChild(script);

    const onInit = async () => {
      await customElements.whenDefined("gmp-map");

      const map = document.querySelector("gmp-map");
      const marker = document.querySelector("gmp-advanced-marker");
      const placePicker = document.querySelector("gmpx-place-picker");
      const infowindow = new window.google.maps.InfoWindow();

      map.innerMap.setOptions({
        mapTypeControl: false,
      });

      placePicker.addEventListener("gmpx-placechange", () => {
        const place = placePicker.value;

        if (!place.location) {
          window.alert("No details available for input: '" + place.name + "'");
          infowindow.close();
          marker.position = null;
          return;
        }

        if (place.viewport) {
          map.innerMap.fitBounds(place.viewport);
        } else {
          map.center = place.location;
          map.zoom = 17;
        }

        marker.position = place.location;
        infowindow.setContent(
          `<strong>${place.displayName}</strong><br>
           <span>${place.formattedAddress}</span>`
        );
        infowindow.open(map.innerMap, marker);
      });
    };

    window.addEventListener("DOMContentLoaded", onInit);

    // Чистим слушатель при размонтировании компонента
    return () => {
      window.removeEventListener("DOMContentLoaded", onInit);
    };
  }, []);

  return (
    <>
      <gmpx-api-loader
        key="AIzaSyBvoTKnUf2pqAGymT-eoy2RWhxfF0ujMqo"
        solution-channel="GMP_GE_mapsandplacesautocomplete_v2"
      ></gmpx-api-loader>

      <gmp-map
        center="40.749933,-73.98633"
        zoom="13"
        map-id="AIzaSyBvoTKnUf2pqAGymT-eoy2RWhxfF0ujMqo"
        style={{ width: "100%", height: "500px", display: "block" }}
      >
        <div
          slot="control-block-start-inline-start"
          className="place-picker-container"
        >
          <gmpx-place-picker placeholder="Enter an address"></gmpx-place-picker>
        </div>
        <gmp-advanced-marker></gmp-advanced-marker>
      </gmp-map>
    </>
  );
};

export default Map;