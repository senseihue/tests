<script setup lang="ts">
import { usePermissionService } from "~/features/permission"
import { IPermissionGroup } from "~/entities/permission"

const model = defineModel<number[]>({ default: () => [] })

const { getPermissionsGroupBy, loading } = usePermissionService()
const modal = useModal()
const { t } = useI18n()

const groups = ref<IPermissionGroup[]>([])
const localSelected = ref<number[]>([])

const onShow = () => {
  localSelected.value = [...model.value]
  getPermissionsGroupBy(groups)
}

const onHide = () => {
  localSelected.value = []
}

const onSubmit = () => {
  model.value = [...localSelected.value]
  modal.hide("permission")
}

const openModal = () => {
  modal.show("permission")
}

const togglePermission = (id: number, checked: boolean) => {
  if (checked) {
    if (!localSelected.value.includes(id)) localSelected.value.push(id)
  } else {
    localSelected.value = localSelected.value.filter(existing => existing !== id)
  }
}
</script>

<template>
  <div class="w-full">
    <ui-button
      type="button"
      variant="white"
      class="w-full justify-start whitespace-nowrap text-left font-normal"
      :class="{ 'text-muted-foreground': !model.length }"
      @click="openModal"
    >
      <span v-if="model.length" class="truncate">
        {{ $t('labels.results', { count: model.length }) }} ({{ model.length }})
      </span>
      <span v-else class="truncate text-gray-400">
        {{ $t('placeholders.permissions') }}
      </span>
    </ui-button>

    <ui-modal id="permission" :label="$t('labels.permissions')" :loading="loading" @show="onShow" @hide="onHide">
      <div class="flex max-h-[60vh] flex-col gap-6 overflow-y-auto p-4">
        <template v-if="groups.length">
          <div v-for="group in groups" :key="group.id" class="flex flex-col gap-3 rounded-lg border p-4 shadow-sm">
            <h3 class="text-sm font-semibold text-gray-800">{{ group.name }}</h3>
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <ui-checkbox
                v-for="perm in group.permissions"
                :key="perm.id"
                :model-value="localSelected.includes(perm.id) as any"
                @update:model-value="togglePermission(perm.id, $event as boolean)"
                :value="perm.id"
                :label="perm.name"
              />
            </div>
          </div>
        </template>
        <div v-else-if="!loading" class="text-center text-sm text-gray-500">
          {{ $t('placeholders.data_not_found') }}
        </div>
      </div>

      <template #footer="{ hide }">
        <div class="ui-modal-footer">
          <ui-button variant="white" color="secondary" :label="$t('actions.cancel')" @click="hide" />
          <ui-button :label="$t('actions.save')" @click="onSubmit" />
        </div>
      </template>
    </ui-modal>
  </div>
</template>
