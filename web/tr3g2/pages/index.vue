<script lang="ts">
export default {
  data() {
    return {
      socket: null as NuxtSocket | null
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: '/',
    })
  }
}
</script>

<template>
  <div>
    <h1>Nuxt Routing set up successfully!</h1>
    <NuxtLink to="/shop">Go to the shop page</NuxtLink><br>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
  </div>
</template>