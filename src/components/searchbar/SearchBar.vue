<script lang="ts" src="./SearchBar.ts" />

<template>
  <div class="searchbar-container">
    <input type="text" class="form-control" placeholder="Buscar lugares" v-model="searchTerm" />
    <search-results />
  </div>
</template>

<style scoped>
.searchbar-container {
  position: fixed;
  top: 30px;
  left: 30px;
  background-color: white;
  z-index: 999;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
  width: 250px;
  height: 60%;
  border-radius: 10px;
  overflow: scroll;
  padding: 5px;
}

input {
  width: 100%;
}
</style>
