<template>
  <v-footer class="footer" fixed>
    <v-col class="text-center" cols="12">
      <strong>Copyright {{ new Date().getFullYear() }} Grune.</strong> All rights reserved.
      <span class="float-none float-sm-right">
        制作会社: 
        <a href="https://grune.co.jp" target="_blank" style="color: #99c95a;text-decoration: underline;">
          株式会社Grune 
          <v-icon color="#99c95a">mdi-launch</v-icon>
        </a>
      </span>
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
