<script lang="ts">
import { ref, toRefs, computed, watch, onMounted, onUnmounted /* , onUpdated */ } from 'vue'
import type { Ref } from 'vue'
import { debouncedRef } from '@coyoda/core/debounce'
import { numberFormat } from '@coyoda/core/number'
import FormInput from './NuInput.vue'
import NuIconChevronRight from './icons/NuIconChevronRight.vue'
// import { $, jQuery } from 'jquery'
// import $ from 'jquery'
// import 'datatables.net'
// import 'datatables.net-dt/css/jquery.dataTables.css'
// import 'datatables.net-fixedheader'
// import 'datatables.net-fixedheader/js/dataTables.fixedHeader.js'

export default {
  props: {
    columns: Array,
    dat: Array,
    totals: Object,
    showFilter: {
      type: Boolean,
      default: true
    },
    // checkedAlso: Array,
    maxWidth: Number,
    maxHeight: Number,
    sortKey: String,
    sortDir: {
      type: Number,
      default: 1
    }
  },
  emits: [ 'clicked-row', 'checkboxes-changed', 'filter-changed', 'clicked-row-details-btn' ],
  setup(props, { emit }) {
    const tbl: Ref<HTMLElement | null> = ref(null)
    const tblHeader: Ref<HTMLElement | null> = ref(null)
    const tblFooter: Ref<HTMLElement | null> = ref(null)
    const tblContent: Ref<HTMLElement | null> = ref(null)
    const filterText = debouncedRef('', 300)
    const data = ref(toRefs(props).dat)
    const sortKey = ref(toRefs(props).sortKey)
    const sortDir = ref(toRefs(props).sortDir)
    const checkboxes = ref([])
    const selectedId = ref('')

    const _data = computed(() => {
      if (filterText.value && filterText.value !== '') {
        return data.value.filter(dat => {
          /* istanbul ignore else: Otherwise Istanbul shows an uncovered else. */
          if (dat && dat.name) {
            return dat.name.toLowerCase().indexOf(filterText.value) >= 0
          // } else if (!(filterText.value > 0)) {
            // return true
          }
        })
      }
      if (sortKey.value) {
        return data.value.sort((a, b) => (a[sortKey.value] < b[sortKey.value]) ? -sortDir.value : sortDir.value)
      } else {
        return data.value
      }
    })

    // watch(toRefs(props).dat, (dat/* , prevVal */) => {
    //   console.log('watch3', dat)
    // })

    watch(filterText, (filterText/* , prevVal */) => {
      emit('filter-changed', filterText)
    })

    watch(checkboxes, (checkboxes/* , prevVal */) => {
      // console.log('checkboxes-changed', checkboxes)
      emit('checkboxes-changed', checkboxes)
    })

    // watch(computed(() => props.checkedAlso), (checkedAlso/* , prevVal */) => {
    //   // console.log('checkedAlso', checkedAlso)
    //   for (const check of checkedAlso) {
    //     if (!checkboxes.value.some(e => e === check)) {
    //       checkboxes.value.push(check)
    //     }
    //   }
    // })

    onMounted(() => {
      window.addEventListener('resize', xscroll)
      xscroll()
      setTimeout(() => {
        xscroll()
      }, 100)
      // applyScript()
    })

    // onUpdated(() => {
    //   // applyScript()
    //   // $(tbl.value).DataTable()
    // })

    onUnmounted(() => {
      window.removeEventListener('resize', xscroll)
    })

    // onBeforeUnmount (() => {
    // })
    // onBeforeUpdate (() => {
    // })

    // function applyScript () {
    //   // console.log('onMounted', tbl.value, $)
    //   // $(tbl.value, 'thead tr').clone().appendTo($(tbl.value, 'tfoot'))
    //   // $(tbl.value, 'tfoot th').each( function () {
    //   //   var title = 'Search ' + $(this).text()
    //   //   title = ''
    //   //   $(this).html( '<input type="text" placeholder="'+title+'" />' )
    //   // } );

    //   var table = $(tbl.value).DataTable({
    //     // paging: false,
    //     pageLength: 10,
    //     bAutoWidth: false,
    //     // fixedHeader: true
    //     // fixedHeader: {
    //     //   header: true,
    //     //   footer: true,
    //     //   headerOffset: 300
    //     // }
    //     columnDefs: [
    //       // { type: 'num-fmt', targets: 3 }
    //       // { type: 'formatted-num', targets: 'sortNum' }
    //     ],
    //     language: {
    //       decimal: '.',
    //       thousands: ','
    //     }
    //   })

    //   // table.columns().every( function () {
    //   //   var that = this
    //   //   $( 'input', this.footer() ).on( 'keyup change', function () {
    //   //     if ( that.search() !== this.value ) {
    //   //       that.search( this.value ).draw()
    //   //     }
    //   //   } )
    //   // } )
    // }

    function getAlign (column) {
      // if (column.ky === '_checkbox_') {
      //   return 'middle'
      // }
      return column.align || 'left'
    }

    function getStyles () {
      let ret = ''
      ret += props.maxWidth > 0 ? ' max-width: ' + props.maxWidth + 'px !important; ' : ''
      ret += props.maxHeight > 0 ? ' max-height: ' + props.maxHeight + 'px !important; ' : ''
      return ret
    }

    function clickRow (da) {
      emit('clicked-row', da)
      selectedId.value = da._id
    }

    function clickUnselectAll () {
      checkboxes.value = []
    }

    function getDat (da, column) {
      let ret = da && da[column.ky]
      if (ret) {
        ret = numberFormat(ret, column.fmt)
      }
      return ret
    }

    function getColumnStr (column) {
      let ret = column.ky
      if (ret === '_checkbox_') {
        ret = '✓'
      } else {
        while (ret.substr(0, 1) === '_') {
          ret = ret.substr(1)
        }
        /* istanbul ignore else: Otherwise Istanbul shows an uncovered else. */
        if (column.title.value) {
          ret = column.title.value
        } else if (column.title) {
          ret = column.title
        }
      }
      return ret
    }

    function xscroll () {
      const headerDisplayOri = tblHeader.value?.style.display
      const footerDisplayOri = tblFooter.value?.style.display
      if (tblHeader.value) {
        tblHeader.value.style.display = 'none'
      }
      if (tblFooter.value) {
        tblFooter.value.style.display = 'none'
      }

      const headerThs =  tblHeader.value?.querySelectorAll('th')
      const footerThs =  tblFooter.value ? tblFooter.value.querySelectorAll('th') : []

      if (tblContent.value) {
        for (const [i, td] of  tblContent.value.querySelectorAll('tr:first-child td').entries()) {
          // const o = td.offsetWidth
          // const o = td.clientWidth
          const rect = td.getBoundingClientRect()
          const o = rect.width
          if (headerThs?.[i]) {
            headerThs[i].style.width = o + 'px'
          }
          if (footerThs[i]) {
            footerThs[i].style.width = o + 'px'
          }
        }
      }

      if (tblHeader.value) {
        tblHeader.value.style.display = headerDisplayOri || ''
      }
      if (tblFooter.value) {
        tblFooter.value.style.display = footerDisplayOri || ''
      }

      if (tblHeader.value && tblContent.value) {
        tblHeader.value.scrollLeft = tblContent.value?.scrollLeft
      }
      if (tblFooter.value && tblContent.value) {
        tblFooter.value.scrollLeft = tblContent.value?.scrollLeft
      }
    }

    /*
    --------------------------------------------------------------------------
    Mouse actions
    --------------------------------------------------------------------------
    */
    
    let thMouseDownStartX = 0
    let thMouseDownStartY = 0
    let thMouseDownState = 0
    let thMouseColsWidths: Array<number> = []
    let thMouseColsStyleWidths: Array<number> = []
    let thMouseSelectedColIx = 0

    const columnsMinW = 250
    const columnsResizerHalfWidth = 3

    function isWithinBounds(e: any, rect: DOMRect): boolean {
      return (
        e.clientX >= rect.left &&
        e.clientX <= rect.left + rect.width &&
        e.clientY >= rect.top &&
        e.clientY <= rect.top + rect.height
      );
    }

    const getThs = (): Array<HTMLElement> | null  => tblHeader.value && Array.from(tblHeader.value.querySelectorAll('tr th'))

    const getColgroupCols = (): Array<HTMLElement> | null => tbl.value && Array.from(tbl.value.querySelectorAll('colgroup col'))

    const thMouseDown = (ev: MouseEvent) => {
      // Cache the mouse position at the time of the mouse click.
      thMouseDownStartX = ev.clientX
      thMouseDownStartY = ev.clientY

      thMouseDownState = 1

      // Get the column widths and cache them.
      thMouseColsWidths = []
      thMouseColsStyleWidths = []
      const cols = getColgroupCols()
      if (cols) {
        for (let i = 0; i < cols.length; i++) {
          const rect = cols[i].getBoundingClientRect()
          thMouseColsWidths.push(rect.width)
          thMouseColsStyleWidths.push(parseFloat(cols[i].style.width))
        }
      }

      // Check if the mouse is over a column resizer, and cache the corresponding column.
      thMouseSelectedColIx = -1
      const ths = getThs()
      if (ths) {
        for (let i = 0; i < ths.length; i++) {
          const rect = ths[i].getBoundingClientRect()
          if (isWithinBounds(ev, rect)) {
            const x = ev.clientX - rect.left // x position within the element.
            if (x < columnsResizerHalfWidth && i > 0) {
              thMouseSelectedColIx = i - 1
            }
            if (x > rect.width - columnsResizerHalfWidth && i < ths.length - 1) {
              thMouseSelectedColIx = i
            }
          }
        }
      }
    }

    const thMouseUp = (ev: MouseEvent) => {
      thMouseDownStartX = ev.clientX
      thMouseDownStartY = ev.clientY
      thMouseDownState = 0
    }

    const thMouseMove = (ev: MouseEvent) => {
      // Change the mouse cursor to indicate that the user can resize the column, if the mouse is over the column's edge.
      const ths = getThs()
      if (ths) {
        for (let i = 0; i < ths.length; i++) {
          if (isWithinBounds(ev, ths[i].getBoundingClientRect())) {
            const rect = ths[i].getBoundingClientRect()
            const x = ev.clientX - rect.left // x position within the element.
            if ((x < columnsResizerHalfWidth && i > 0) || (x > rect.width - columnsResizerHalfWidth && i < ths.length - 1)) {
              tblHeader.value?.classList.add('col-resize')
            } else {
              tblHeader.value?.classList.remove('col-resize')
            }
          }
        }
      }

      if (thMouseDownState === 1 && thMouseSelectedColIx >= 0) {
        // The mouse is down and the user is resizing a column.
        tblHeader.value?.classList.add('col-resize2')
        const dX =  ev.clientX - thMouseDownStartX
        const cols = getColgroupCols()
        if (cols) {
          let colsWidth = 0 // Total width of all columns.
          let colsStyleWidth = 0 // Total width of all columns, as specified in the style attribute.
          for (let i = 0; i < cols.length; i++) {
            colsWidth += thMouseColsWidths[i]
            colsStyleWidth += thMouseColsStyleWidths[i]
          }

          const dX2 = (dX / colsWidth) * colsStyleWidth
          let w = thMouseColsStyleWidths[thMouseSelectedColIx] + dX2
          let w2 = thMouseColsStyleWidths[thMouseSelectedColIx + 1] - dX2

          if (w2 < columnsMinW) {
            w -= columnsMinW - w2
            w2 = columnsMinW
          }

          if (w < columnsMinW) {
            w2 -= columnsMinW - w
            w = columnsMinW
          }

          cols[thMouseSelectedColIx].style.width = w + 'px'
          cols[thMouseSelectedColIx + 1].style.width = w2 + 'px'

          xscroll()
        }
      } else {
        tblHeader.value?.classList.remove('col-resize2')
      }
    }

    window.addEventListener('mousemove', thMouseMove)
    window.addEventListener('mouseup', thMouseUp)

    const tdMouseEnter = (ev: MouseEvent) => {
      (ev?.target as Element)?.classList.add('nux-hover')
    }

    const tdMouseLeave = (ev: MouseEvent) => {
      (ev?.target as Element)?.classList.remove('nux-hover')
    }

    const clickDetailsBtn = (da: any) => {
      emit('clicked-row-details-btn', da)
    }

    return {
      tbl,
      tblHeader,
      tblFooter,
      tblContent,
      filterText,
      data: _data,
      xscroll,
      checkboxes,
      selectedId,

      getDat,
      getColumnStr,
      clickRow,
      clickUnselectAll,
      getStyles,
      getAlign,
      thMouseDown,
      thMouseUp,
      thMouseMove,
      tdMouseEnter,
      tdMouseLeave,
      clickDetailsBtn
    }
  },

  components: {
    FormInput,
    NuIconChevronRight
  }
}
</script>

<template>
  <div class="tblwrapper nu-flex nu-flex-shrink-grow nu-overflow-auto">
    <div class="nu-flex nu-center-content nu-end-horz nu-w-full mb-2" v-if="showFilter || checkboxes.length">
      <template v-if="checkboxes.length">
        <span class="filter-comment">Selected: {{ checkboxes.length }}</span>
        <!-- <button v-on:click="clickUnselectAll" class="dt-unselect-all btn btn-sm btn-outline mr-2">
          Unselect all
        </button> -->
        <button class="dt-unselect-all btn btn-outline btn-square btn-sm mr-2" @click="clickUnselectAll">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-4 h-4 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </template>

      <template v-if="showFilter">
        <span class="filter-comment" v-if="filterText">Filtered: {{ data.length }}</span>

        <!-- Filter input -->
        <FormInput
          class="dt-filter-text w-28"
          label=""
          sub-label=""
          qqqplaceholder="Filter"
          size="sm"
          icon="search"
          v-model="filterText"
        />
      </template>
    </div>

    <div
      class="tableFixHead nu-flex nu-flex-col"
      :class="totals ? 'has-footer' : 'no-footer'"
      v-on:scroll="xscroll"
      :style="getStyles()"
    >
      <div class="table-header nu-flex-none nu-flex" ref="tblHeader">
        <table>
          <thead>
            <tr>
              <th
                v-for="column in columns"
                v-bind:key="column.ky"
                :align="getAlign(column)"
                :class="{ 'sortNum': column.tp === 'num', 'pl-1.5': getColumnStr(column) === '✓' }"
                :style="column.overflow === 'visible' ? 'overflow: visible !important;' : ''"
                @mousedown="thMouseDown"
                @qqqmouseup="thMouseUp"
                @qqqmousemove="thMouseMove"
              >
                <div class="nu-flex nu-center-vert">
                  <span class="nu-m-r-sm" v-if="column.icon">
                    <NuIcon>
                      <component :is="column.icon" />
                    </NuIcon>
                  </span>
                  <span>
                    {{ getColumnStr(column) }}
                  </span>
                </div>
              </th>
            </tr>
          </thead>
        </table>
        <!-- <div class="table-hdr-filler"></div> -->
      </div>
      <div class="table-content nu-flex-shrink-grow" ref="tblContent" v-on:scroll="xscroll">
        <table ref="tbl">
          <colgroup>
            <col v-for="column in columns" v-bind:key="column.ky" span="1" style="width: 1000px;" />
          </colgroup>
          <tbody>
            <tr v-for="da in data" v-bind:key="da && da._id" :class="da._id === selectedId ? 'bg-purple-200' : 'odd:bg-white even:bg-rhgray'">
              <td
                v-for="column in columns"
                v-bind:key="da._id + column.ky"
                :align="getAlign(column)"
                v-on:click="column.ky !== '_checkbox_' ? clickRow(da) : null"
                class="nux-td"
                @mouseenter="tdMouseEnter"
                @mouseleave="tdMouseLeave"
              >
                <template v-if="column.ky === '_checkbox_'">
                  <label class="cursor-pointer qqqlabel">
                    <div>
                      <input type="checkbox" :value="da._id" v-model="checkboxes" class="checkbox">
                      <span class="checkbox-mark"></span>
                    </div>
                  </label>
                </template>
                <template v-else>
                  <div class="nu-flex" >
                    <span class="nu-flex-grow" v-html="getDat(da, column)"></span>
                    <span
                      class="nux-detail-btn nu-flex nu-flex-no-wrap nu-center-vert nu-center-self-horz nu-h-full"
                      @click="clickDetailsBtn(da)"
                      v-if="column.showDetailsButton"
                    >
                      {{ $t('Details') }}
                      <NuIcon>
                        <NuIconChevronRight />
                      </NuIcon>
                    </span>
                  </div>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-footer nu-flex-none nu-flex" ref="tblFooter" v-if="totals">
        <table>
          <tfoot>
            <tr>
              <th
                v-for="column in columns"
                v-bind:key="column.ky"
                :align="getAlign(column)"
                :class="{ 'sortNum': column.tp === 'num' }"
                :style="column.overflow === 'visible' ? 'overflow: visible !important;' : ''"
              >
                <span>{{ getDat(totals, column) }}</span>
              </th>
            </tr>
          </tfoot>
        </table>
        <!-- <div class="table-ftr-filler"></div> -->
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.table-content
  overflow auto

.table-header, .table-footer
  overflow hidden

.table-header table, .table-footer table
  table-layout fixed

.table-header table th, .table-footer table th
  overflow hidden
  text-overflow ellipsis

.table-hdr-filler, .table-ftr-filler
  min-width 99px

table
  border-collapse separate
  border-spacing 0px
  width 100%

th, .table-hdr-filler, .table-ftr-filler
  // background #e8e8e8
  color #888
  border-bottom 1px solid var(--nu-cl-border-table)

th:not(:last-child), td:not(:last-child)
  border-right 1px solid var(--nu-cl-border-table)

th span
  pointer-events none
  user-select none

td
  padding 2px 4px !important
  border-bottom 1px solid var(--nu-cl-border-table)

tr:last-child td
  border-bottom none

.tableFixHead.no-footer, thead th, .table-hdr-filler
  border-bottom 1px solid #fofofo !important

tfoot th, .table-ftr-filler
  border-top 1px solid var(--nu-cl-border-table) !important

th
  padding 2px 4px 2px 4px
  font-weight normal

.col-resize, .col-resize2
  cursor col-resize

/* table input { position: absolute; left: 0; right: 0; top: 0; bottom: 0; width: 100%; border: 1px solid #ddd; } */

.filter-comment
  @apply mr-2 input-sm px-0

.dt-unselect-all
  color #777
  border-color #777
.dt-unselect-all:hover
  @apply bg-primary-focus

body .checkbox-mark
  @apply w-4 h-4
  border-color #aaa
body .checkbox:checked~.checkbox-mark::before
  transform:= rotate(45deg)translate(-1px,-1px)scale(0.7) !important
body .checkbox:checked~.checkbox-mark::before
  animation none !important

.table-header th span
  white-space pre

NuIcon
  width 12px
  height 12px
  color #aaa

.nux-td:not(.nux-hover) .nux-detail-btn
  display: none

.nux-detail-btn
  color: #aaa
  background-color white
  white-space nowrap
  position absolute
  right 0
  padding-left var(--nu-sz-sm)
  cursor pointer
  &:hover, &:hover NuIcon
    color var(--nu-cl-focus)
  & NuIcon
    margin-left var(--nu-sz-sm)
</style>

<style>
/* .tblwrapper input[type="search"] {
  padding: 1px 2px !important;
  appearance: searchfield;
  font-size: 10px;
}
.dataTables_wrapper .dataTables_length select {
  padding: 1px 2px !important;
  font-size: 10px !important;
}
.dataTables_wrapper .dataTables_paginate .paginate_button.current, .dataTables_wrapper .dataTables_paginate .paginate_button.current:hover, .dataTables_wrapper .dataTables_paginate .paginate_button {
  padding: 1px !important;
} */
</style>
