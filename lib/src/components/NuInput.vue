<script lang="ts">
// Vue 3 form elements guide:https://v3.vuejs.org/guide/forms.html#select-options
// Cleave input mask lib: https://github.com/nosir/cleave.js and https://github.com/ankurk91/vue-cleave-component/blob/master/src/component.js and demo: https://jsfiddle.net/6p1wsqnv/

import { ref, watch, onMounted, onUnmounted } from 'vue'
import Cleave from 'cleave.js'
import NuIconHelp from './icons/NuIconHelp.vue'

export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    labelIcon: {
      type: String,
      default: ''
    },
    subLabel: {
      type: String,
      default: ''
    },
    helpTxt: {
      type: String,
      default: ''
    },
    placeholder: String,
    modelValue: [String, Number],
    tp: String,
    size: String,
    icon: String,
    mask: {
      type: String,
      default: ''
    },
    labelOrientation: {
      type: String,
      default: 'left'
    }
  },

  emits: [ 'update:modelValue' ],

  components: { NuIconHelp },

  setup(props, { emit }) {
    const inp = ref(null)
    const liveValue = ref(props.modelValue)
    const lastEmittedValue = ref(null)
    const placehldr = ref('')
    const showHelp = ref(false)
    let cleave = null

    if (props.placeholder) {
      placehldr.value = props.placeholder
    } else {
      /* istanbul ignore else: Otherwise Istanbul shows an uncovered else. */
      if (props.tp === 'int' || props.tp === 'float') {
        placehldr.value = '0'
        if (props.modelValue + '' === '0') {
          liveValue.value = ''
        }
      }
    }

    watch(() => props.modelValue, (modelValue) => {
      if (modelValue !== lastEmittedValue.value) {
        if (cleave) {
          cleave.setRawValue(modelValue)
        } else {
          liveValue.value = modelValue
        }
      }
    })

    const clickHelp = () => {
      showHelp.value = !showHelp.value
    }

    function valueChanged (v) {
      let lv = v

      if (props.tp === 'int') {
        v = parseInt(v, 10)

        lv = v

        if (isNaN(v)) {
          v = 0
          lv = ''
        }
      }

      if (props.tp === 'float') {
        v = parseFloat(v)

        lv = v

        if (isNaN(v)) {
          v = 0
          lv = ''
        }
      }

      lastEmittedValue.value = v
      emit('update:modelValue', v)

      if (!props.mask) {
        liveValue.value = lv
        inp.value.value = lv
      }
    }

    function inputChanged (v) {
      if (!props.mask) {
        valueChanged(v, false)
      }
    }

    onMounted(() => {
      if (!cleave && props.mask) {
        let cleaveOpts = {}

        if (props.mask === 'int') {
          cleaveOpts = {
            // prefix: '$ ',
            numeral: true,
            numeralPositiveOnly: true,
            noImmediatePrefix: true,
            rawValueTrimPrefix: true,
            numeralIntegerScale: 21,
            numeralDecimalScale: 0
          }
        }

        if (props.mask === 'float2d') {
          cleaveOpts = {
            // prefix: '$ ',
            numeral: true,
            numeralPositiveOnly: true,
            noImmediatePrefix: true,
            rawValueTrimPrefix: true,
            numeralIntegerScale: 21,
            numeralDecimalScale: 2
          }
        }

        cleaveOpts.onValueChanged = (v) => {
          valueChanged(v.target.rawValue)
          liveValue.value = v.target.value
        }

        cleave = new Cleave(inp.value, cleaveOpts)
      }
    })

    onUnmounted(() => {
      /* istanbul ignore else  */ // There is no test yet where cleave is null here.
      if (cleave) {
        cleave.destroy()
        cleave = null
      }
    })

    const labelMouseEnter = (ev: MouseEvent) => {
      (ev?.target as Element)?.classList.add('nux-hover')
    }

    const labelMouseLeave = (ev: MouseEvent) => {
      (ev?.target as Element)?.classList.remove('nux-hover')
    }

    return {
      inp,
      liveValue,
      placehldr,
      showHelp,

      inputChanged,
      clickHelp,
      labelMouseEnter,
      labelMouseLeave
    }
  }
}
</script>

<template>
  <div
    :class="{'nux-label-left nu-flex': labelOrientation === 'left'}"
    @mouseenter="labelMouseEnter"
    @mouseleave="labelMouseLeave"
  >
    <label
      class="nu-label nu-flex nu-p-vert-0"
      :class="{'nu-m-r-md': labelOrientation === 'left'}"
      v-if="label !== '' || subLabel !== '' || helpTxt !== '' || labelOrientation === 'left'"
    >
      <div class="nu-flex nu-flex-grow nu-flex-col">
        <div class="nu-flex nu-flex-grow nu-center-vert">
          <div class="nu-flex nu-flex-grow nu-flex-wrap nu-bottom-vert">
            <div class="nu-label-text nu-m-r-md nu-m-vert-md nu-flex">
              <NuIcon class="nu-m-r-md nux-no-hover" v-if="labelIcon">
                <component :is="labelIcon" />
              </NuIcon>
              {{label}}
            </div>

            <NuGrow />

            <div class="nu-label-text-alt nu-ml-auto nu-mb-md">{{subLabel}}</div>
          </div>

          <NuIcon @click="clickHelp" class="nux-help-btn nu-m-l-md nu-clickable" :class="{ 'active': showHelp }" v-if="helpTxt !== ''">
            <NuIconHelp />
          </NuIcon>
        </div>

        <div class="nu-mb-sm" v-if="showHelp && helpTxt !== ''">
          {{ helpTxt }}
        </div>
      </div>
    </label>
    <div
      class="nux-inp-icon-wrapper nu-flex nu-center-vert nu-w-full nu-relative"
      :class="{'nu-mb-md': labelOrientation !== 'left'}"
    >
      <input
        class="nu-input nu-w-full"
        :class="{ 'nu-input-sm': size === 'sm', 'nu-pl-xl': icon }"
        type="text"
        :value="liveValue"
        @input="inputChanged($event.target.value)"
        :placeholder="placehldr"
        ref="inp"
      />
      <span class="nux-inp-icon-inner-wrapper nu-flex-shrink-not-grow nu-absolute nu-m-l-md nu-w-lg nu-top-bottom-0 nu-flex nu-center-vert" v-if="icon">
        <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
        </svg>
      </span>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.nux-inp-icon-inner-wrapper
  color #9CA3AF

.nux-inp-icon-wrapper:focus-within .nux-inp-icon-inner-wrapper
  color var(--nu-cl-focus) !important

.nux-label-left
  label
    width 160px

input
  border-color white

.nux-label-left:not(.nux-hover) .nux-help-btn
  display: none

NuIcon.nux-no-hover
  cursor inherit
  color inherit
</style>
