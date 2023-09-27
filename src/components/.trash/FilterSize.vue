<template>
  <div class="filter-size">
    <div class="filter-title">Размер</div>
    <div class="filter-size__list">
      <button class="filter-size__item">S</button>
      <button class="filter-size__item">M</button>
      <button class="filter-size__item">L</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: "FilterSize",
})
</script>

<style lang="scss" scoped>
.filter-size {
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