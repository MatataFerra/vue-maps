import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import mapboxgl from "mapbox-gl";
import store from "./store";

if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    throw new Error("Geolocation is not supported by your browser");
}

mapboxgl.accessToken =
    "pk.eyJ1IjoibWF0YXRhZmVycmEiLCJhIjoiY2xiMG94eGpxMTE0NDNvbzNyMmZuNWVyeSJ9.5jJMG26Z2j5_aWF3ltharw";

createApp(App).use(store).use(router).mount("#app");
