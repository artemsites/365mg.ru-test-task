<template>
  <h2 class="title">Каталог</h2>

  <div class="box">
    <aside class="aside">
      <FilterBox />
    </aside>

    <main class="catalog _pl3">
      <template v-for="product in filteredProducts" :key="product.id">
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

  >* {
    margin-bottom: 1.5rem;
  }

  &._pl3 {
    padding-left: 2rem;
  }
}
</style>

<script>
import { mapState } from 'pinia';
import { useStore } from '../stores/store';

import FilterBox from '../components/FilterBox.vue';
import CardItem from '../components/CardItem.vue';

import { defineComponent } from 'vue';

export default defineComponent({
  name: "BasketView",
  components: {
    FilterBox,
    CardItem,
  },

  data() {
    return {
      products: [],
      filteredProducts: [],
    }
  },

  computed: {
    ...mapState(useStore, ['filterState']),
  },

  watch: {
    filterState: {
      handler(newFilterState) {
        this.filteredProducts = []

        let filtersKeys = Object.keys(newFilterState);

        if (filtersKeys.length === 0) this.filteredProducts = this.products;
        else {
          this.products.forEach(product => {

            filtersKeys.forEach(filterId => {
              if (product.brand === filterId) this.filteredProducts.push(product);

              if (product.offers) {
                product.offers.forEach(offer => {
                  if (offer.color === filterId) this.filteredProducts.push(product);
                  if (offer.sizes === newFilterState[filterId].title) this.filteredProducts.push(product);
                })
              }
            })

          })
        }
      },
      deep: true,
      // immediate: true,
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
        if (Object.keys(this.filteredProducts).length === 0) this.filteredProducts = data
        this.products = data
      });
  },

})
</script>
