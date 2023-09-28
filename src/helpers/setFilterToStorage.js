export function setFilterToStorage(id) {
    const curFiltersState = localStorage.getItem('filtersState');

    if (curFiltersState === null || curFiltersState === '') {
      localStorage.setItem('filtersState', id)
    }
    else {
      let newFiltersState = curFiltersState+','+id
      localStorage.setItem('filtersState', newFiltersState)
    }



    console.log("localStorage.getItem('filtersState')")
    console.log(localStorage.getItem('filtersState'))
}