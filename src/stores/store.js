import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }

  const filters = ref({});
  const filterState = ref({});

  fetch('/api/filter.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
    .then((res) => res.json())
    .then((data) => {
      let curFilter = data.sort((a, b) => {
        return Object.values(a)[0].sort - Object.values(b)[0].sort
      })

      curFilter.forEach((filter) => {
        const filterData = Object.values(filter)[0]

        filterData.value.sort((a, b) => {
          if (a.sort) return a.sort - b.sort
        })

        filters.value[filterData.id] = filterData
      })
    });

  return {
    filters,
    filterState,
    // count,
    // doubleCount,
    // increment
  }
})
