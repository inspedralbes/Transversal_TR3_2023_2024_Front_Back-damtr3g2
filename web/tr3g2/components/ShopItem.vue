<script lang="ts">
import { ref } from 'vue';
import CommonSkin from '../assets/Epic_Skin.png'; // Import the image
import RareSkin from '../assets/Legendary_Skin.png'; // Import the image
import EpicSkin from '../assets/Hextech_Skin.png'; // Import the image
import LegendarySkin from '../assets/Ultimate_Skin.png'; // Import the image

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
  setup(props) {
    const skinImages = {
      Common: CommonSkin,
      Rare: RareSkin,
      Epic: EpicSkin,
      Legendary: LegendarySkin
    };

    const rarityImage = computed(() => {
      return skinImages[props.item.rarity]; // Retrieve the appropriate image based on item rarity
    });

    return {
      rarityImage
    }
  },
  mounted() {

  }
}
</script>

<template>
  <div :style="{ backgroundImage: `url(${item.image})` }" :class="['rounded-lg', 'bg-cover', 'border', 'border-2', 'h-[35rem]', 'hover:scale-125 transition-all', {
    'border-yellow-500': item.rarity === 'Legendary',
    'border-blue-500': item.rarity === 'Rare',
    'border-purple-500': item.rarity === 'Epic',
    'border-green-500': item.rarity === 'Common'
  }]">
    <!-- <img :src="item.image" alt="Product image" class="w-96 h-96 rounded-t-lg drop-shadow-xl mb-2"> -->
    <UDivider :label="item.rarity" class="mt-[29rem]">
      <img :src="rarityImage" class="w-12" />
    </UDivider>
    <div class="mt-3">
      <h1 class="text-center text-2xl mb-2 ">{{ item.name }}</h1>
    </div>
  </div>
</template>


<style></style>