<template>
  <div class="card" :class="{ '_disabled': product.stock === 0 }">
    <img :src="product.image" :alt="product.title" class="card__img">
    <span class="card__name">{{ product.title }}</span>
    <span class="card__brand">{{ product.brand }}</span>
    <span class="card__cost">{{ product.price.value }} {{ (product.price.currency === 'RUB') ? '&#8381;' : '' }}</span>

      <div class="card__colors" v-if="product.offers">
        <ButtonColor 
          v-for="color in colorsForView(product.offers)"
          :key="color.id"
          class="card__color" 
          @click="doFilterProduct(product, color.id)" 
          :color="color.code" 
          :active="false" />
      </div>

      <div class="card__sizes" v-if="product.offers">
        <ButtonSize
          v-for="size in sizesForView(product.offers)"
          :key="size.id"
          class="filter-item__item"
          @click="doFilterProduct(product, size.id)"
          :active="false"
        >
        {{ size.title }}
        </ButtonSize>
      </div>

    <button class="card__add" v-if="product.stock === 0">Нет в наличии</button>
    <button class="card__add" v-else>В корзину</button>
    <!-- <button class="card__add _added">В корзинe</button> -->
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ButtonColor from './ButtonColor.vue';
import ButtonSize from './ButtonSize.vue';

import { mapState } from 'pinia';
import { useFilters } from '../stores/filters';

export default defineComponent({
  name: "ProductCard",

  components: {
    ButtonColor,
    ButtonSize,
  },

  computed: {
    ...mapState(useFilters, ['filterColors']),
  },

  methods: {
    colorsForView(offers) {
      const colorsForView = {}
      offers.forEach(offer=>{
        if (this.filterColors[offer.color] && offer.available > 0) {
          colorsForView[offer.color] = {code: this.filterColors[offer.color].value, id: offer.id}
        }
      })
      return colorsForView
    },

    sizesForView(offers) {
      const sizesForView = {}
      offers.forEach(offer=>{
        if (offer.available!==0 && offer.sizes) sizesForView[offer.sizes] = {title: offer.sizes, id: offer.id}
      })
      return sizesForView
    },

    doFilterProduct(product, offerId) {
      console.log('product')
      console.log(product)
      console.log('offerId')
      console.log(offerId)

      // product.offers - записать изменения отображения 
    },
  },

  props: {
    product: {
      type: Object
    }
  }
})
</script>

<style lang="scss" scoped>
.card {
  display: inline-flex;
  flex-direction: column;

  > * {
    display: inline-flex;
    margin-bottom: 0.5rem;
  }

  &._disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &__add {
    display: inline-flex;
    justify-content: center;

    border: 0.01rem solid var(--dark);
    padding: 0.5rem;
    font-size: 1.1rem;

    margin-bottom: unset;
    margin-top: auto;

    &._added {
      background-color: var(--gray);
    }
  }
}
</style>