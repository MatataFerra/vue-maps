<template>
  <div v-if="distance" class="trip-container column">
    <div class="col">
      Distancia: <strong>{{ distance }}kms</strong>
    </div>
    <div class="col">
      Duración: <strong>{{ duration }} minutos</strong>
    </div>
  </div>
</template>

<script lang="ts">
import { useMapStore } from "@/composables";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TripDetails",
  setup() {
    const { distance, duration } = useMapStore();

    return {
      distance,
      duration,
    };
  },
});
</script>

<style scoped>
.trip-container {
  padding: 10px;
  position: fixed;
  bottom: 100px;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  font-size: 30px;
  left: 20px;
  width: 350px;
}

strong {
  color: aquamarine;
}
</style>
