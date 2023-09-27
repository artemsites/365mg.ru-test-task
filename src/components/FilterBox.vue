<template>
  <div class="filter-box">

    <div class="filter-item" v-for="filter in filters" :key="filter.id">
      <div class="filter-title">{{ filter.title }}</div>

      <div class="filter-item__list" :class="{ '_row': filter.title === 'Цвет' || filter.title === 'Размер' }">

        <template v-for="val in filter.value" :key="val.id">
          <button v-if="filter.title === 'Цвет'" class="filter-item__item _box"
            :style="`--color: ${val.value};`"></button>
          <button v-else-if="filter.title === 'Размер'" class="filter-item__item _box">{{ val.title }}</button>
          <button v-else class="filter-item__item">{{ val.title }}</button>
        </template>

      </div>

    </div>

    <!-- <FilterBrand />
    <FilterColor />
    <FilterSize /> -->
  </div>
</template>

<script>
import { defineComponent } from 'vue';
// import FilterBrand from '../components/FilterBrand.vue';
// import FilterColor from '../components/FilterColor.vue';
// import FilterSize from '../components/FilterSize.vue';

export default defineComponent({
  name: "FilterBox",

  components: {
    // FilterBrand,
    // FilterColor,
    // FilterSize,
  },

  data() {
    return {
      filters: {},
    }
  },
  created() {
    fetch('/api/filter.json', {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then(res => res.json())
      .then(data => {
        let curFilter = data.sort((a, b) => {
          return Object.values(a)[0].sort - Object.values(b)[0].sort;
        });

        curFilter.forEach((filter) => {
          const filterData = Object.values(filter)[0];
          
          filterData.value.sort((a, b) => {
            if (a.sort) return a.sort - b.sort
          });

          this.filters[filterData.id] = filterData;
        });
      });
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

    &._box {
      width: 1.25rem;
      height: 1.25rem;

      display: inline-flex;
      justify-content: center;
      align-items: center;
      border: 0.01rem solid var(--dark);

      margin-right: 0.3rem;
    }

    background-color: var((--color));
  }
}
</style>

