<template>
  <h2 class="title">Каталог</h2>

  <div class="box">
    <aside class="aside">
      <FilterBox />
    </aside>

    <main class="catalog _pl3">
      <template v-for="product in products">
        <CardItem :product="product" />
      </template>
    </main>
  </div>
</template>

<style scoped>
.catalog {
  width: 100%;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  > * {
    margin-bottom: 1.5rem;
  }

  &._pl3 {
    padding-left: 2rem;
  }
}
</style>

<script>
// import Aside from '../components/Aside.vue';
import FilterBox from '../components/FilterBox.vue';
import CardItem from '../components/CardItem.vue';
// import FilterBrand from '../components/FilterBrand.vue';
// import FilterColor from '../components/FilterColor.vue';
// import FilterSize from '../components/FilterSize.vue';

import { defineComponent } from 'vue';

export default defineComponent({
  name: "BasketView",
  components: {
    // Aside,
    FilterBox,
    CardItem,
    // FilterBrand,
    // FilterColor,
    // FilterSize,
  },
  data() {
    return {
      products: [],
    }
  },
  created() {
    fetch('/api/products.json', {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log('data')
        console.log(data)
        this.products = data
        // let curFilter = data.sort((a, b) => {
        //   return Object.values(a)[0].sort - Object.values(b)[0].sort;
        // })

        // curFilter.forEach((filter) => {
        //   this.filters[Object.values(filter)[0].id] = Object.values(filter)[0];
        // });
      });
  }
})
</script>
