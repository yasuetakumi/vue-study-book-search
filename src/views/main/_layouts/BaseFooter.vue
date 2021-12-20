<template>
  <v-footer class="footer" fixed>
    <v-col class="text-center" cols="12">
      <strong>Copyright {{ new Date().getFullYear() }} Grune.</strong> All rights reserved.
      <span class="float-none float-sm-right d-none d-sm-inline">
        制作会社: 
        <a href="https://grune.co.jp" target="_blank" style="color: #99c95a;text-decoration: underline;">
          株式会社Grune 
          <v-icon size="15" color="#99c95a">mdi-launch</v-icon>
        </a>
      </span>
      <div class="row d-block d-sm-none">
        <v-col class="d-flex justify-center align-center">
          制作会社: 
          <a href="https://grune.co.jp" target="_blank" style="color: #99c95a;text-decoration: underline;">
            株式会社Grune 
            <v-icon size="15" color="#99c95a">mdi-launch</v-icon>
          </a>
        </v-col>
      </div>
    </v-col>
  </v-footer>
</template>
<style lang="scss" scoped>
// .footer {
//   position: fixed;
//   bottom: 0%;
//   width: 100%;
// }
</style>
