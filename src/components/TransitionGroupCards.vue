<template>
  <TransitionGroup  mode="out-in" name="cards">
    <slot></slot>
  </TransitionGroup>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: "TransitionGroupCards",
});
</script>

<style lang="scss">

.cards-enter-from,
.cards-leave-to {
  opacity: 0;
}

.v-enter-to, 
.v-leave-from {
  opacity: 1;
}

.cards-move {
  transition: transform 0.5s ease;
}


.cards-enter-active {
  opacity: 1;
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.cards-leave-active {
  opacity: 0;
  transition: opacity 0s ease;
  position: absolute;
}
</style>
