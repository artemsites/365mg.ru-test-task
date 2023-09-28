export function deleteFilterInStorage(id) {
  const curFiltersState = localStorage.getItem('filtersState');
  let arCurFiltersState = curFiltersState.split(',');

  let findedIndexForDelete = arCurFiltersState.findIndex((item)=>item===id)

  arCurFiltersState.splice(findedIndexForDelete, 1);
  localStorage.setItem('filtersState', arCurFiltersState)



  console.log("localStorage.getItem('filtersState')")
  console.log(localStorage.getItem('filtersState'))
}