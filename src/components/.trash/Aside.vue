<template>
  <aside>
    <slot></slot>
  </aside>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: "Aside",
})
</script>