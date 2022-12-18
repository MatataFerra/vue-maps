<script lang="ts" src="./SearchResults.ts" />

<template>
  <div v-if="isLoadingPlaces" class="alert alert-primary text-center">
    <h5>Cargando...</h5>
  </div>
  <ul v-else-if="places.length > 0" class="list-group mt-3 p-2">
    <li
      v-for="place in places"
      class="list-group-item list-group-item-action"
      :class="{ active: place.id === activePlace }"
      @click="onPlaceClick(place)"
      :key="place.id">
      <h5>{{ place.text }}</h5>
      <p>{{ place.place_name }}</p>
      <div>
        <button
          :class="place.id === activePlace ? 'btn-outline-light' : 'btn-outline-primary'"
          class="btn btn-sm"
          @click.self="getRouteDirections(place)">
          Direcciones
        </button>
      </div>
    </li>
  </ul>
</template>

<style scoped>
li {
  cursor: pointer;
}
</style>
