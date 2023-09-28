import { ref } from 'vue'
import { defineStore } from 'pinia'

import { deleteFilterInStorage } from '../helpers/deleteFilterInStorage'
import { setFilterToStorage } from '../helpers/setFilterToStorage'

export const useFilters = defineStore('filters', () => {
  const filters = ref({})
  const filtersItems = ref({})
  const filtersState = ref({})
  const filterColors = ref({})

  function setFilter(val) {
    if (this.filtersState[val.id]) {
      deleteFilterInStorage(val.id)
      delete this.filtersState[val.id]
    } else {
      setFilterToStorage(val.id)
      this.filtersState[val.id] = val
    }
  }

  function setFiltersStateFromStorage() {
    let curFiltersState = localStorage.getItem('filtersState')

    if (curFiltersState !== null && curFiltersState !== '') {
      let arCurFiltersState = localStorage.getItem('filtersState').split(',')

      for (let i in filtersItems.value) {
        let filterId = filtersItems.value[i].id
        let filterVal = filtersItems.value[i]
        if (arCurFiltersState.includes(filterId)) filtersState.value[filterId] = filterVal
      }
    }
  }

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
        const filterTypeItems = Object.values(filter)[0]

        filterTypeItems.value.sort((a, b) => {
          if (a.sort) return a.sort - b.sort
        })

        filters.value[filterTypeItems.id] = filterTypeItems

        // Создание списка фильтров
        filterTypeItems.value.forEach((filterTypeItem) => {
          filtersItems.value[filterTypeItem.id] = filterTypeItem
        })

        // Создание сотношения цветов
        if (filter.color) {
          filter.color.value.forEach((color) => {
            filterColors.value[color.id] = color
          })
        }
      })

      setFiltersStateFromStorage()
    })

  return {
    filters,
    filtersState,
    filterColors,
    setFilter
  }
})
