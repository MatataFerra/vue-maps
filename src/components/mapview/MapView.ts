import { defineComponent, onMounted, ref, watch } from "vue";
import { usePlacesStore, useMapStore } from "@/composables";
import Mapboxgl from "mapbox-gl";

export default defineComponent({
  name: "MapView",

  setup() {
    const mapElement = ref<HTMLDivElement>();
    const { isUserLocationReady, userLocation } = usePlacesStore();
    const { setMap } = useMapStore();

    const initMap = async () => {
      if (!mapElement.value) throw new Error("Map element is not defined");
      if (!userLocation.value) throw new Error("User location is not defined");

      await Promise.resolve();

      const map = new Mapboxgl.Map({
        container: mapElement.value, // container ID
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        center: userLocation.value, // starting position [lng, lat]
        zoom: 15, // starting zoom
      });
      const myLocationPopup = new Mapboxgl.Popup({ offset: 25 }).setLngLat(userLocation.value).setText("You are here");

      new Mapboxgl.Marker({
        color: "#000",
        draggable: false,
      })
        .setLngLat(userLocation.value)
        .addTo(map)
        .setPopup(myLocationPopup);

      setMap(map);
    };

    onMounted(() => {
      if (isUserLocationReady.value) return initMap();
    });

    watch(isUserLocationReady, (isReady) => {
      if (isReady) return initMap();
    });

    return {
      isUserLocationReady,
      mapElement,
    };
  },
});
