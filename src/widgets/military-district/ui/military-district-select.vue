<script setup lang="ts">
import { useMilitaryDistrictApi, IMilitaryDistrict } from "~/features/military-district"
import UiSelect from "@vueform/multiselect"

interface IProps {
  autoSelect?: boolean
  fetchOnOpen?: boolean
}

const props = defineProps<IProps>()
const model = defineModel<number | number[] | string | string[]>()

const api = useMilitaryDistrictApi()
const el = ref()

const params = ref<Record<string, any>>({
  keyword: "",
  page: 1,
  size: 100
})

const map = (value: IMilitaryDistrict[]): ISelect[] => value?.map(({ id, name }) => ({ value: id, label: name }))

const { loading, onOpen, onClose, onSearch, options } = useSelect<IMilitaryDistrict>({
  el,
  map,
  model,
  params,
  autoSelect: props.autoSelect,
  fetchOnOpen: props.fetchOnOpen,
  api: api.getMilitaryDistrictList
})
</script>

<template>
  <ui-select
    v-model="model"
    v-bind="$attrs"
    autocomplete="off"
    searchable
    :options="options"
    :loading="loading"
    :filter-results="false"
    @open="onOpen"
    @close="onClose"
    @search-change="onSearch"
  >
    <template #afterlist>
      <span ref="el"></span>
    </template>
  </ui-select>
</template>
