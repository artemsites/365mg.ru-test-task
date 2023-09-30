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

    >* {
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
      // filteredProducts: [],
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
        this.products = data
      });
  },

  computed: {
    ...mapState(useFilters, ['filtersState']),

    filteredProducts() {
      let filteredProducts = [];

      if (Object.keys(this.filtersState).length === 0) {
        filteredProducts = this.products;
      }
      else {

        for (let product of this.products) {

          let productFilteredState = {
            brand: null,
            offers: []
          };



          // Если ищем брэнд (id === 1)
          if (this.filtersState[1]) {
            let brand = this.filtersState[1].find(brand => brand.id === product.brand)
            if (brand) {
              productFilteredState.brand = true
            }
            else {
              productFilteredState.brand = false
            }
          }



          // если фильтруем цвет или размер
          if (this.filtersState[2] || this.filtersState[3]) {

            // если брэнд отфильтрован или не установлен 
            // в продукте есть предложения
            if (productFilteredState.brand !== false && product.offers) {

              // разбираем предложения 
              product.offers.forEach(offer => {
                if (offer.available > 0) {

                  // если ищем цвет id===2
                  if (this.filtersState[2]) {
                    this.filtersState[2].forEach(filterItem => {
                      if (offer.color === filterItem.id) {
                        // если мы отфильтровали цвет и фильтруем размеры
                        if (this.filtersState[3]) {
                          this.filtersState[3].forEach(filterItem => {
                            if (offer.sizes === filterItem.title) {
                              productFilteredState.offers.push(offer)
                            }
                          })
                        }
                        else {
                          // и все в которых совпадает цвет кидаем в массив offers
                          productFilteredState.offers.push(offer)
                        }
                      }
                    })
                  }
                  // если ищем размер id===3
                  else if (this.filtersState[3]) {
                    this.filtersState[3].forEach(filterItem => {
                      if (offer.sizes === filterItem.title) {
                        productFilteredState.offers.push(offer)
                      }
                    })
                  }

                }
              })

            }
            
            // Если после фильтрации офферов ничего не найдено то записываем false
            if (productFilteredState.offers.length === 0) productFilteredState.offers = false
          }

          if (productFilteredState.brand !== false && productFilteredState.offers !== false) {
            // продукт проходит фильтрацию
            filteredProducts.push(product);
          }
        }
      }

      return filteredProducts;
    },
  },

})
</script>