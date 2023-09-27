<template>
  <div class="filter-color">
    <div class="filter-title">Цвет</div>
    <div class="filter-color__list">
      <button class="filter-color__item">1</button>
      <button class="filter-color__item">2</button>
      <button class="filter-color__item">3</button>
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
.filter-color {
  &__list {
    display: inline-flex;
  }
  &__item {
    width: 1.25rem;
    height: 1.25rem;

    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 0.01rem solid var(--dark);

    margin-right: 0.3rem;
  }
}
</style>