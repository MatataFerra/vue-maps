import axios from "axios";

const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    limit: 5,
    language: "es",
    access_token:
      "pk.eyJ1IjoibWF0YXRhZmVycmEiLCJhIjoiY2tlbTczeWk3MGdoNDMybzV5OWY5MnlnNiJ9.__LvytlUJXXiZAxMt0pH9Q",
  },
});

export default searchApi;
