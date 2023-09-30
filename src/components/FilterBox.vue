<template>
  <div class="filter-box">

    <div class="filter-item" v-for="filterList in filters" :key="filterList.id">
      <div class="filter-title">{{ filterList.title }}</div>

      <div class="filter-item__list" :class="{ '_row': filterList.title === 'Цвет' || filterList.title === 'Размер' }">

        <template v-for="filterItem in filterList.value" :key="filterItem.id">
          <!-- @todo громоздкая логика в шаблоне -->
          <!-- {{ filterItem.id }} -->
          <!-- {{ this.filtersState[1] }} -->
          <ButtonColor
            v-if="filterList.title === 'Цвет'"
            class="filter-item__item"
            @click="setFilter(filterItem, filterList.id)"
            :color="filterItem.value"
            :active="filterItemActive(filterItem, filterList.id)" />

          <ButtonSize
            v-else-if="filterList.title === 'Размер'"
            class="filter-item__item"
            @click="setFilter(filterItem, filterList.id)"
            :active="filterItemActive(filterItem, filterList.id)" >
            {{ filterItem.title }}
          </ButtonSize>

          <button
            v-else
            class="filter-item__item"
            @click="setFilter(filterItem, filterList.id)"
            :class="{'_active': filterItemActive(filterItem, filterList.id)}">
            {{ filterItem.title }}
          </button>
        </template>

      </div>

    </div>

  </div>
</template>



<script>
import { defineComponent } from 'vue';
import { mapState, mapWritableState } from 'pinia';
import { useFilters } from '../stores/filters';
import ButtonColor from './ButtonColor.vue';
import ButtonSize from './ButtonSize.vue';

export default defineComponent({
  name: "FilterBox",

  components: {
    ButtonColor,
    ButtonSize,
  },

  data() {
    return {
    }
  },
  computed: {
    ...mapState(useFilters, ['filters', 'setFilter']),
    ...mapWritableState(useFilters, ['filtersState']),
  },
  created() {
  },

  methods: {
    filterItemActive(filterItem, filterId) {
      if (this.filtersState[filterId]) return this.filtersState[filterId].find(el=>el.id===filterItem.id)
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
  }
}
</style>