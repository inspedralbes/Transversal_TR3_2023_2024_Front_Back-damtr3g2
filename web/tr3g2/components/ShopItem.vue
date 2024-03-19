<script lang="ts">
import { ref } from 'vue';

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    }
  },
  setup() {

    return {

    }
  },
  mounted() {

  }
}
</script>

<template>
  <div class="rounded-lg border border-1 border-black">
    <img :src="item.image" alt="Product image" class="w-96 h-96 rounded-lg drop-shadow-xl">
    <div class="card-body mt-6">
      <h5 class="card-title">{{ item.title }}</h5>
      <p class="card-text">{{ item.description }}</p>
      <div class="flex border border-1 border-black items-center">
        <p class="text-lg font-bold mr-4">{{ item.price }}$</p>
        <UButton color="purple" variant="solid" class="mt-2">Comprar</UButton>
      </div>
    </div>
  </div>
</template>


<style></style>