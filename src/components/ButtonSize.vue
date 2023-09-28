<template>
  <button class="btn-size" :class="{'_active': active}">
    <slot></slot>
  </button>  
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: "ButtonSize",
  props: {
    active: {
      type: Boolean
    },
  }
})
</script>

<style lang="scss" scoped>
  .btn-size {
    width: 1.25rem;
    height: 1.25rem;

    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 0.01rem solid var(--dark);

    margin-right: 0.3rem;
    &._active {
      border: 0.15rem solid var(--accent);
    }
  }
</style>