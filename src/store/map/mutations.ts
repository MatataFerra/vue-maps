import { MutationTree } from "vuex";
import { MapState } from "./state";
import Mapboxgl from "mapbox-gl";
import { Feature } from "@/interfaces/places";

const mutation: MutationTree<MapState> = {
  setMap(state, map: Mapboxgl.Map) {
    state.map = map;
  },

  setDistanceDuration(state, { distance, duration }: { distance: number; duration: number }) {
    let kms = distance / 1000;
    kms = Math.round(kms * 100) / 100;
    state.distance = kms;
    state.duration = Math.floor(duration / 60);
  },

  setPlaceMarkers(state, places: Feature[]) {
    state.markers.forEach((marker) => marker.remove());

    state.markers = [];
    if (!state.map) return;

    for (const place of places) {
      const [lng, lat] = place.center;

      const popup = new Mapboxgl.Popup({ offset: 25 }).setLngLat([lng, lat]).setHTML(`
        <div class="flex flex-col">
          <h3 class="font-bold text-lg">${place.place_name}</h3>
          <p class="text-sm">${place.text}</p>
        </div>
      `);

      const customMarker = new Mapboxgl.Marker({
        color: "#000",
        draggable: false,
      })
        .setLngLat([lng, lat])
        .addTo(state.map as Mapboxgl.Map)
        .setPopup(popup);

      state.markers.push(customMarker);
    }

    if (state.map.getLayer("RouteString")) {
      state.map.removeLayer("RouteString");
      state.map.removeSource("RouteString");
      state.distance = undefined;
      state.duration = undefined;
    }
  },

  setRoutePolyLine(state, coords: number[][]) {
    const start = coords[0];
    const end = coords[coords.length - 1];

    const bounds = new Mapboxgl.LngLatBounds([start[0], start[1]], [start[0], start[1]]);

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }

    state.map?.fitBounds(bounds, {
      padding: 100,
    });

    const sourceDate: Mapboxgl.AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        ],
      },
    };

    if (state.map?.getSource("RouteString")) {
      state.map?.removeLayer("RouteString");
      state.map?.removeSource("RouteString");
    }

    state.map?.addSource("RouteString", sourceDate);

    state.map?.addLayer({
      id: "RouteString",
      type: "line",
      source: "RouteString",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#000",
        "line-width": 8,
      },
    });
  },
};

export default mutation;
