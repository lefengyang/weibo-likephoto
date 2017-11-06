<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import api from './api'

export default {
    name: 'app',
    created() {
        if(api.GetGsid()==''){
            this.$router.push({path:'/login', query:{}});
            return;
        }
    }
}
</script>

<style>
@import '../static/css/reset.scss'
</style>
