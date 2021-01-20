<template>
  <v-container>
    <v-progress-circular
      indeterminate
      color="blue-grey lighten-2"
      :size="70"
      :width="7"
      class="loader"
    ></v-progress-circular>
  </v-container>
</template>
<style lang="scss" scoped>
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
