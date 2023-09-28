<template>
  <div class="filter-box">

    <div class="filter-item" v-for="filter in filters" :key="filter.id">
      <div class="filter-title">{{ filter.title }}</div>

      <div class="filter-item__list" :class="{ '_row': filter.title === 'Цвет' || filter.title === 'Размер' }">

        <template v-for="val in filter.value" :key="val.id">
          <button v-if="filter.title === 'Цвет'" class="filter-item__item _box" :class="{'_active': (this.filterState[val.id])?this.filterState[val.id].id===val.id:false}" :style="`--color: ${val.value};`" @click="setFilter(val, $event)"></button>  

          <button v-else-if="filter.title === 'Размер'" class="filter-item__item _box" @click="setFilter(val, $event)" :class="{'_active': (this.filterState[val.id])?this.filterState[val.id].id===val.id:false}">{{ val.title }}</button>  

          <button v-else class="filter-item__item" @click="setFilter(val, $event)" :class="{'_active': (this.filterState[val.id])?this.filterState[val.id].id===val.id:false}">{{ val.title }}</button>  
        </template>

      </div>

    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState, mapWritableState } from 'pinia';
import { useStore } from '../stores/store';

export default defineComponent({
  name: "FilterBox",

  components: {
  },

  data() {
    return {
    }
  },
  computed: {
    ...mapState(useStore, ['filters']),
    ...mapWritableState(useStore, ['filterState']),
  },
  created() {
  },

  methods: {
    setFilter(val, event) {
      if (this.filterState[val.id]) {
        delete this.filterState[val.id]
      }
      else {
        this.filterState[val.id] = val;
      }
      console.log('this.filterState')
      console.log(this.filterState)
    }
  }
})
</script>

<style lang="scss" scoped>
.filter-box {
  > :deep(*) {
    margin-bottom: 2rem;
  }
}

.filter-item {
  &__list {
    display: inline-flex;
    flex-direction: column;
    margin-top: 0.8rem;

    &._row {
      flex-direction: row;
    }
  }

  &__item {
    margin-bottom: 0.3rem;

    &._active {
      font-weight: 700;
    }

    &._box {
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

    background-color: var((--color));
  }
}
</style>

