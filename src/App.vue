<template>
  <div class="container mt-5">
    <h1>Weekly PAYE calculate</h1>
    <YourEmployees class="mt-3" />
    <YourResult class="mt-3" />
  </div>
  <div class="fixed-bottom">
    <p class="text-center">Contact: <a href="mailto:Newbuiow@gmail.com" class="text-decoration-undeline text-black">Newbuiow@gmail.com</a></p>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import YourEmployees from './components/YourEmployees.vue'
import YourResult from './components/YourResult.vue'
export default {
  name: 'App',
  components: {
    YourEmployees,
    YourResult,
  }
}
</script>

<style>

</style>
