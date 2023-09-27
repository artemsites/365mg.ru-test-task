<template>
  <div class="filter-brands">
    <div class="filter-title">Бренды</div>
    <div class="filter-brands__list">
      <button class="filter-brands__item">Все товары</button>
      <button class="filter-brands__item">Бренд 1</button>
      <button class="filter-brands__item">Бренд 2</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: "FilterBrand",
})
</script>

<style lang="scss" scoped>
.filter-brands {
  &__list {
    display: inline-flex;
    flex-direction: column;
    margin-top: 0.8rem;
  }
  &__item {
    margin-bottom: 0.3rem;
  }
}
</style>