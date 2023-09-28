<template>
  <button class="btn-color" :class="{'_active': active}"></button>  
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: "ButtonColor",
  props: {
    color: {
      type: String
    },
    active: {
      type: Boolean
    },
  }
})
</script>

<style lang="scss" scoped>
  .btn-color {
    background-color: v-bind(color);

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