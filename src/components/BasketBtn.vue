<template>
  <div class="basket-btn">
    <BasketIco class="basket-btn__ico" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BasketIco from './icons/BasketIco.vue';

export default defineComponent({
  name: "BasketBtn",
  components: {
    BasketIco
  }
})
</script>

<style lang="scss" scoped>
  .basket-btn {
    &__ico {
      width: 2rem;
      height: 2rem;
    }
  }
</style>