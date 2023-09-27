<template>
  <div class="filter-box">

    <div class="filter-item" v-for="filter in filters" :key="filter.id">
      <div class="filter-title">{{ filter.title }}</div>

      <div class="filter-item__list" :class="{'_row': filter.title === 'Цвет'||filter.title === 'Размер'}">

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
        console.log('data')
        console.log(data)
        // this.filters = data.sort((a, b)=>{
        //   // console.log('a')
        //   // console.log(Object.entries(a))
        //   return Object.values(a)[0].sort - Object.values(b)[0].sort;
        // })
        let curFilter = data.sort((a, b) => {
          return Object.values(a)[0].sort - Object.values(b)[0].sort;
        })

        console.log('curFilter')
        console.log(curFilter)

        curFilter.forEach((filter) => {
          this.filters[Object.values(filter)[0].id] = Object.values(filter)[0];
        });

        console.log('this.filters')
        console.log(this.filters)
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

