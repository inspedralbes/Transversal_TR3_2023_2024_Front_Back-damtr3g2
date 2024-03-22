<script lang="ts">
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
  mounted() {
    console.log('Item:', this.item);
  }

}
</script>

<template>
  <div :class="['rounded-lg', {
    'bg-yellow-200': item.rarity === 'Legendary',
    'bg-blue-200': item.rarity === 'Rare',
    'bg-purple-200': item.rarity === 'Epic',
    'bg-green-200': item.rarity === 'Common'
  }]">
    <img :src="item.image" alt="Product image" class="w-full h-full mb-2 rounded-t-lg">
    <UDivider :label="item.rarity" />
    <div class="mt-3">
      <h1 class="text-center text-2xl mb-2">{{ item.name }}</h1>
      <p class="p-4 pt-2">{{ item.description }}</p>
      <div class="flex justify-end p-4 pt-2 items-center">
        <p class="text-2xl font-bold mr-4">{{ item.price }}$</p>
        <UButton color="purple" variant="solid" class="mt-2">Comprar</UButton>
      </div>
    </div>
  </div>
</template>
<!-- <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="$emit('close-modal')" /> -->

<style scoped></style>