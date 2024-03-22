<script lang="ts">
import { ref, computed } from 'vue';
import ShopItem from '../components/ShopItem.vue';
import itemModal from '../components/ItemModal.vue';
import commManager from '~/services/CommunicationManager';

export default {
  data() {
    return {
      socket: null as NuxtSocket | null
    }
  },
  setup() {
    const filtersVariable = ref(false)
    const price = ref(15)
    const placeholderItems = ref([]);
    const isOpen = ref(false);
    let selectedItem = ref(0);


    let filteredItems = computed(() => {
      return placeholderItems.value.filter(item => item.price <= price.value);
    });

    function filtersVisibility() {
      filtersVariable.value = !filtersVariable.value;
      console.log(filtersVariable.value)
    }

    function openModal(item) {
      selectedItem.value = item;
      isOpen.value = true;
    }

    return {
      price,
      placeholderItems,
      filtersVisibility,
      filtersVariable,
      filteredItems,
      isOpen,
      selectedItem,
      openModal
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: '/',
    })

    commManager.fetchItems().then((response) => {
      console.log(response);
      this.placeholderItems = response;
    }).catch((error) => {
      console.log(error)
    });
  }
}
</script>

<template>
  <NuxtLink to="/">!</NuxtLink><br>
  <div>
    <div class="flex border border-1 border-black">
      <!-- Filters -->
      <div v-show="filtersVariable" class="w-1/5 border border-1 border-black p-8">
        <h1>Price Picker</h1>
        <URange color="purple" v-model="price" :max="30" />
        {{ price }}
      </div>
      <!-- Shop -->
      <div :class="[filtersVariable ? 'w-4/5' : 'w-full'] + ' border border-1 border-black'">
        <UButton color="purple" icon="i-heroicons-adjustments-horizontal" @click="filtersVisibility"></UButton>
        <h1>Products</h1>
        <div :class="['grid', filtersVariable ? 'grid-cols-4' : 'grid-cols-5', 'gap-4', 'px-12']">
          <ShopItem v-for="item in filteredItems" :key="item.id" :item="item" @click="openModal(item)" />
          <UModal v-model="isOpen">
            <ItemModal :item="selectedItem" @close-modal="isOpen = false" />
          </UModal>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
