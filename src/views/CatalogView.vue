<template>
  
  <h2 class="title">Каталог</h2>
  
  <aside>
    <FilterBox />
  </aside>

  <main class="main basket">
  </main>
</template>

<style scoped>
</style>

<script>
// import Aside from '../components/Aside.vue';
import FilterBox from '../components/FilterBox.vue';
// import FilterBrand from '../components/FilterBrand.vue';
// import FilterColor from '../components/FilterColor.vue';
// import FilterSize from '../components/FilterSize.vue';

import { defineComponent } from 'vue';

export default defineComponent({
  name: "BasketView",
  components: {
    // Aside,
    FilterBox,
    // FilterBrand,
    // FilterColor,
    // FilterSize,
  }
})
</script>
