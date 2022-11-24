<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { AgGridVue } from '@ag-grid-community/vue3'
import { AllCommunityModules } from '@ag-grid-community/all-modules'
import '@ag-grid-community/styles/ag-grid.css'
// import '@ag-grid-community/styles/ag-theme-alpine.css'
// import '@ag-grid-community/styles/ag-theme-balham.css'
import '@ag-grid-community/styles/ag-theme-material.css'

// See: https://www.ag-grid.com/vue-data-grid/getting-started/#setting-row-data-3
// See: https://github.com/ag-grid/ag-grid-vue3-example/blob/0722ec132c6a67c73c6182c2f48118d7c3fdcb2b/src/rich-grid-example/RichGridExample.vue

const props = defineProps({
  data: Object,
  columnDefs: Object
})

const modules = AllCommunityModules

const gridApi = ref(null) // Optional - for accessing Grid's API

// Obtain API from grid's onGridReady event
const onGridReady = (params: any) => {
  gridApi.value = params.api
}

// DefaultColDef sets props common to all Columns
const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1
}

const cellWasClicked = (event: any) => { // Example of consuming Grid Event
  console.log('cell was clicked', event)
}

// const deselectRows = () =>{
//   gridApi.value.deselectAll()
// }
</script>

<template>
  <ag-grid-vue
    class="qqqag-theme-alpine ag-theme-material"
    style="height: 500px"
    :columnDefs="props.columnDefs?.value"
    :rowData="props.data"
    :modules="modules"
    :defaultColDef="defaultColDef"
    rowSelection="multiple"
    animateRows="true"
    @cell-clicked="cellWasClicked"
    @grid-ready="onGridReady"
  />
</template>
