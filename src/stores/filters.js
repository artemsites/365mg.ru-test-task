import { ref } from 'vue'
import { defineStore } from 'pinia'

// import { deleteFilterInStorage } from '../helpers/deleteFilterInStorage'
import { setFilterToStorage } from '../helpers/setFilterToStorage'

export const useFilters = defineStore('filters', () => {
  const filters = ref({})
  const filtersItems = ref({})
  const filtersState = ref({})
  const filterColors = ref({})

  function setFilter(filterItem, filter) {
    // console.log('filterItem')
    // console.log(filterItem)

    // Если типа фильтра такого ещё нет то создание массива 
    if (!this.filtersState[filter.id]) {
      this.filtersState[filter.id] = []
    } 

    let index = this.filtersState[filter.id].findIndex(el=>el.id===filterItem.id)
    // Если фильтр есть в типе то удаление
    if (index>=0) {
      // let index = this.filtersState[filter.id].findIndex(el=>el.id===filterItem.id)
      this.filtersState[filter.id].splice(index, 1)
      if (this.filtersState[filter.id].length===0) delete this.filtersState[filter.id]
      setFilterToStorage(this.filtersState)
    }  
    // Иначе добавление фильтра в тип
    else {
      this.filtersState[filter.id].push(filterItem)
      setFilterToStorage(this.filtersState)
    }

    console.log('this.filtersState')
    console.log(this.filtersState)
  }

  function setFiltersStateFromStorage() {
    let curFiltersState = JSON.parse(localStorage.getItem('filtersState'))

    if (curFiltersState&&Object.keys(curFiltersState).length > 0) {
      filtersState.value = curFiltersState
    }

    // if (curFiltersState !== null && curFiltersState !== '') {
    //   let arCurFiltersState = localStorage.getItem('filtersState').split(',')

    //   for (let i in filtersItems.value) {
    //     let filterId = filtersItems.value[i].id
    //     let filterVal = filtersItems.value[i]
    //     if (arCurFiltersState.includes(filterId)) filtersState.value[filterId] = filterVal
    //   }
    // }

    // console.log('filtersState.value')
    // console.log(filtersState.value)
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
