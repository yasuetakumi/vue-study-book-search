<template>
  <div v-if="isDebug" style=" position: absolute; left:5px; top:5px; color:#ff00ff;">
    apiEndpoint: {{apiEndPoint}}<br/>
    [{{ getMockId($route.name) }}] RouteName: {{$route.name}}<br/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      apiEndPoint: process.env.VUE_APP_API_ENDPOINT,
      isDebug: process.env.NODE_ENV === 'development' || process.env.IS_DEBUG,
    };
  },
  methods:{
    getMockId (route_name){
      // --- Please change mock id as add/remove route ---
      switch(route_name){
        case 'adminLogin': return 'A0';
        case 'login': return 'B0';
        case 'users': return 'A1';
        case 'users.create': return 'A2';
        case 'users.edit': return 'A3';
        case 'dummy_meetings': return 'A4';
        case 'dummy_meetings.create': return 'A5';
        case 'dummy_meetings.edit': return 'A6';
        default: return '-';
      }
    }
  },
};
</script>
