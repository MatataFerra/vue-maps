import { ActionTree } from "vuex";
import { PlacesState } from "./state";
import { StateInterface } from "../index";
import { searchApi } from "@/apis";
import { Feature, PlacesResponse } from "../../interfaces/places";

const actions: ActionTree<PlacesState, StateInterface> = {
  getInitialLocation({ commit }) {
    // TODO: Colocar loading
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        commit("setLngLat", { lng: coords.longitude, lat: coords.latitude });
      },
      (error) => {
        console.error(error);
        throw new Error("No geolocation");
      }
    );
  },

  async searchPlacesByTerm({ commit, state }, term: string): Promise<Feature[]> {
    if (!term) {
      commit("setPlaces", []);
      return [];
    }

    commit("setIsLoadingPlaces");

    if (!state.userLocation) {
      throw new Error("No user location");
    }

    const { data } = await searchApi.get<PlacesResponse>(`/${term}.json`, {
      params: {
        proximity: state.userLocation?.join(","),
      },
    });

    commit("setPlaces", data.features);

    return data.features;
  },
};

export default actions;
