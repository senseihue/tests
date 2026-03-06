<script setup lang="ts">
import { usePermissionService } from "~/features/permission"
import { IPermissionGroup } from "~/entities/permission"

const model = defineModel<number[]>({ default: () => [] })

const { getPermissionsGroupBy, loading } = usePermissionService()

const groups = ref<IPermissionGroup[]>([])

onMounted(() => {
  getPermissionsGroupBy(groups)
})

const togglePermission = (id: number, checked: boolean) => {
  if (checked) {
    if (!model.value.includes(id)) {
      model.value = [...model.value, id]
    }
  } else {
    model.value = model.value.filter(existing => existing !== id)
  }
}
</script>

<template>
  <div class="w-full">
    <div v-if="groups.length" class="flex flex-col gap-6">
      <div v-for="group in groups" :key="group.id" class="flex flex-col gap-3 rounded-lg border p-4 shadow-sm bg-white">
        <h3 class="text-base font-semibold text-gray-800 border-b pb-2">
          {{ group.department?.name }} - {{ group.name }}
        </h3>
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <ui-checkbox
            v-for="perm in group.permissions"
            :key="perm.id"
            :model-value="model.includes(perm.id) as any"
            @update:model-value="togglePermission(perm.id, $event as boolean)"
            :value="perm.id"
            :label="perm.name"
          />
        </div>
      </div>
    </div>
    <div v-else-if="loading" class="flex justify-center p-8">
      <span class="text-sm text-gray-500">{{ $t('messages.info.loading') }}...</span>
    </div>
    <div v-else class="text-center text-sm text-gray-500 p-8 border rounded-lg bg-white">
      {{ $t('placeholders.data_not_found') }}
    </div>
  </div>
</template>
