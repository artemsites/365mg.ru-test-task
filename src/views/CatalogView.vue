<template>
  <h2 class="title">Каталог</h2>

  <div class="box">
    <aside class="box__aside aside">
      <FilterBox />
    </aside>

    <main class="box__catalog catalog _pl3">
      <div class="catalog__box">
        <TransitionGroupCards>
          <ProductCard :product="product" v-for="product in filteredProducts" :key="product.id" />
        </TransitionGroupCards>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.catalog {
  flex-shrink: 1;

  &._pl3 {
    padding-left: 2rem;
  }

  &__box {  
    width: 100%;

    display: flex;
    flex-wrap: wrap;

    position: relative;

    > * {
      width: calc(25% - 3rem / 4);

      flex-shrink: 0;
      flex-grow: 0;

      margin-bottom: 1.5rem;
      &:not(:nth-child(4n)) {
        margin-right: 1rem;
      }
    }
  }
}
</style>

<script>
import { mapState } from 'pinia';
import { useFilters } from '../stores/filters';

import FilterBox from '../components/FilterBox.vue';
import ProductCard from '../components/ProductCard.vue';
import TransitionGroupCards from '../components/TransitionGroupCards.vue';

import { defineComponent } from 'vue';

export default defineComponent({
  name: "BasketView",
  components: {
    FilterBox,
    ProductCard,
    TransitionGroupCards,
  },

  data() {
    return {
      products: [],
      filteredProducts: [],
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

  computed: {
    ...mapState(useFilters, ['filterState']),
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



})
</script>
