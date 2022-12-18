<template>
  <button v-if="isBotonReady" @click="onMyLocationClick" class="btn btn-primary">Ir a mi ubicación</button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useMapStore, usePlacesStore } from '@/composables';

export default defineComponent({
  name: 'MyLocationBtn',
  setup() {
    const { userLocation, isUserLocationReady } = usePlacesStore();
    const { map, isMapReady } = useMapStore()
    return {
      isBotonReady: computed<boolean>(() => isUserLocationReady.value && isMapReady.value),
      onMyLocationClick: () => {
        if (isUserLocationReady.value) {
          map.value?.flyTo({
            center: userLocation.value ?? [50.4268641,4.4287242],
            zoom: 14,
        
          });
        }
      }
    }
  },
})
</script>


<style scoped>
button {
  position: fixed;
  top: 30px;
  right: 30px;
}
</style>