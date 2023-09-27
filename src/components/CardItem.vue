<template>
  <div class="card" :class="{'_disabled': product.stock===0}">
    <img :src="product.image" :alt="product.title" class="card__img">
    <span class="card__name">{{ product.title }}</span>
    <span class="card__brand">{{ product.brand }}</span>
    <span class="card__cost">{{ product.price.value }} {{ (product.price.currency==='RUB')?'&#8381;':'' }}</span>
    <!-- <div class="card__colors"></div>
    <div class="card__sizes"></div> -->
    <button class="card__add" v-if="product.stock===0">Нет в наличии</button>
    <button class="card__add" v-else>В корзину</button>
    <!-- <button class="card__add _added">В корзинe</button> -->
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: "CardItem",
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

    width: calc(25% - 1rem);

    > * {
      margin-bottom: 0.5rem;
    }

    &._disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &__add {
      border: 0.01rem solid var(--dark);
      padding: 0.5rem;
      font-size: 1.1rem;
      text-align: center;
      &._added {
        background-color: var(--gray);
      }
    }
  }
</style>