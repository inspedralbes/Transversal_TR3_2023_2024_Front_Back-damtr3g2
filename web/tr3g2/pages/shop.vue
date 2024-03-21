<script lang="ts">
import { ref, computed } from 'vue';
import ShopItem from '../components/ShopItem.vue';

export default {
  data() {
    return {
      socket: null as NuxtSocket | null
    }
  },
  setup() {
    const filtersVariable = ref(false)
    const price = ref(15)
    const placeholderItems = [
      [
        {
          "id": 1,
          "name": "Dragon Slayer",
          "game": "Legend of Valor",
          "price": 9.99,
          "rarity": "Epic",
          "description": "Un skin legendario que transforma tu personaje en un valiente guerrero que lucha contra dragones.",
          "image": "https://img.fruugo.com/product/1/56/1084549561_max.jpg"
        },
        {
          "id": 2,
          "name": "Space Explorer",
          "game": "Galactic Adventures",
          "price": 7.49,
          "rarity": "Rare",
          "description": "Explora el espacio exterior con este skin que convierte tu personaje en un intrépido astronauta.",
          "image": "https://i.ebayimg.com/images/g/W0AAAOSwPNhjc~au/s-l1600.jpg"
        },
        {
          "id": 3,
          "name": "Cyber Ninja",
          "game": "Future Combat",
          "price": 12.99,
          "rarity": "Legendary",
          "description": "Domina el combate futurista con este skin que te convierte en un ninja cibernético.",
          "image": "https://media.vandal.net/i/1200x900/1-2023/202311714315411_1.jpg"
        },
        {
          "id": 4,
          "name": "Arcane Mage",
          "game": "Mystic Realm",
          "price": 5.99,
          "rarity": "Common",
          "description": "Usa la magia antigua con este skin que otorga poderes arcanos a tu personaje.",
          "image": "https://pbs.twimg.com/media/Fpbae4fXEAklEBi.jpg"
        },
        {
          "id": 5,
          "name": "Dark Knight",
          "game": "Shadow Realms",
          "price": 8.99,
          "rarity": "Rare",
          "description": "Embárcate en una cruzada oscura con este skin que convierte tu personaje en un temido caballero de la noche.",
          "image": "https://www.syfy.com/sites/syfy/files/2022/02/rev-1-tbm-08116_high_res_jpeg.jpeg"
        },
        {
          "id": 6,
          "name": "Fire Phoenix",
          "game": "Blaze Odyssey",
          "price": 11.49,
          "rarity": "Legendary",
          "description": "Surca los cielos con este skin que transforma tu personaje en un majestuoso fénix de fuego.",
          "image": "https://cdn.marvel.com/content/1x/avengers_2018_39_intro_image.jpg"
        },
        {
          "id": 7,
          "name": "Frost Guardian",
          "game": "Frozen Lands",
          "price": 9.99,
          "rarity": "Common",
          "description": "Protege el reino helado con este skin que te convierte en un guardián de la escarcha.",
          "image": "https://pm1.aminoapps.com/6907/200daccb0dcd499bb9146ba478786d1e26afdbc0r1-600-600v2_00.jpg"
        },
        {
          "id": 8,
          "name": "Infernal Demon",
          "game": "Hellfire Inferno",
          "price": 14.99,
          "rarity": "Legendary",
          "description": "Desata el caos con este skin que invoca el poder de los demonios infernales.",
          "image": "https://i.pinimg.com/564x/1a/1a/6a/1a1a6ab7571ef45673602fbfefe968f4.jpg"
        }
      ]

    ]

    let filteredItems = computed(() => {
      return placeholderItems[0].filter(item => item.price <= price.value);
    });

    function filtersVisibility() {
      filtersVariable.value = !filtersVariable.value;
      console.log(filtersVariable.value)
    }

    return {
      price,
      placeholderItems,
      filtersVisibility,
      filtersVariable,
      filteredItems,
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
        <div :class="['grid', filtersVariable ? 'grid-cols-4' : 'grid-cols-5', 'gap-4', 'p-4']">
          <ShopItem v-for="item in filteredItems" :key="item.id" :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
