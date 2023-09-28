<template>
  <div class="filter-box">

    <div class="filter-item" v-for="filter in filters" :key="filter.id">
      <div class="filter-title">{{ filter.title }}</div>

      <div class="filter-item__list" :class="{ '_row': filter.title === 'Цвет' || filter.title === 'Размер' }">

        <template v-for="val in filter.value" :key="val.id">
          <!-- @todo громоздкая логика в шаблоне -->

          <ButtonColor
            v-if="filter.title === 'Цвет'"
            class="filter-item__item"
            @click="setFilter(val, $event)"
            :color="val.value"
            :active="(this.filterState[val.id])?this.filterState[val.id].id===val.id:false" />

          <ButtonSize
            v-else-if="filter.title === 'Размер'"
            class="filter-item__item"
            @click="setFilter(val, $event)"
            :active="(this.filterState[val.id])?this.filterState[val.id].id===val.id:false" >
            {{ val.title }}
          </ButtonSize>

          <button
            v-else
            class="filter-item__item"
            @click="setFilter(val, $event)"
            :class="{'_active': (this.filterState[val.id])?this.filterState[val.id].id===val.id:false}">
            {{ val.title }}
          </button>
        </template>

      </div>

    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState, mapWritableState } from 'pinia';
import { useStore } from '../stores/store';
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
  }
}
</style>

