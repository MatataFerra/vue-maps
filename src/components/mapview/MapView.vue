<script lang="ts" src="./MapView.ts" />

<template>
    <div v-if="!isUserLocationReady" class="loading-map">
        <div class="text-center">
            <h3>Espere...</h3>
            <p>Estamos cargando el mapa</p>
        </div>
    </div>

    <div v-show="isUserLocationReady" class="map-container">
        <div class="map" ref="mapElement"></div>
    </div>
</template>

<style scoped>
.map-container {
    position: fixed;
    height: 100vh;
    width: 100vw;
}

.map {
    height: 100%;
    width: 100%;
}
.loading-map {
    height: 100%;
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
