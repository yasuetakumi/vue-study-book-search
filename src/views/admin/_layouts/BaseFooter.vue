<template>
  <v-footer class="footer" fixed>
    <v-col class="text-center" cols="12">
      <!-- for PC -->
      <span class="footer-content-pc">
        Copyright © Grune All Rights Reserved
        <!-- <strong>Copyright {{ new Date().getFullYear() }} Grune.</strong> All rights reserved. -->
      </span>
      <!-- END for PC -->
      <!-- for SP -->
      <span class="footer-content-sp">
        Copyright © Grune All Rights Reserved
        <!-- <strong>Copyright {{ new Date().getFullYear() }} Grune.</strong> All rights reserved. -->
      </span>
      <!-- END for SP -->
      <span class="float-none float-sm-right d-none d-sm-inline">
        制作会社: 
        <a href="https://grune.co.jp" target="_blank" style="color: #99c95a;text-decoration: none;">
          <span style="color: #99c95a;text-decoration: underline;" class="ml-2 mr-1">株式会社Grune</span>
          <v-icon size="18" color="#99c95a" style="text-decoration: none;">mdi-launch</v-icon>
        </a>
      </span>
      <div class="row d-block d-sm-none">
        <v-col class="d-flex justify-center align-center">
          制作会社: 
          <a href="https://grune.co.jp" target="_blank" style="text-decoration: none;">
            <span style="color: #99c95a;text-decoration: underline;" class="ml-2 mr-1">株式会社Grune</span>
            <v-icon size="18" color="#99c95a" style="text-decoration: none;">mdi-launch</v-icon>
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
  .footer-content-sp {
    display: none;
  }
  .footer-content-pc {
    position: absolute; 
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto; 
    width: 300px; /* Need a specific value to work */
  }
  @media only screen and (max-width: 599px) {
    .footer-content-sp {
      display: inline;
    }
    .footer-content-pc {
      display: none;
    }
  }
  @media only screen and  (min-width: 600px) and (max-width: 779px){
    .footer-content-pc {
      position: absolute; 
      left: 20px; 
      right: unset; 
      margin-left: unset; 
      margin-right: unset; 
    }
  }
</style>
