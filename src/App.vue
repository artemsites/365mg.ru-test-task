<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Logo from './components/Logo.vue';
import BasketBtn from './components/BasketBtn.vue'
</script>

<template>
  <header class="header container">
    <Logo />
    <BasketBtn />
    <!-- <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/basket">About</RouterLink>
    </nav> -->
  </header>

  <div class="container content">
    <RouterView />
  </div>
</template>

<style scoped>
.header {
  height: 5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 0.1rem solid black;
}
</style>
