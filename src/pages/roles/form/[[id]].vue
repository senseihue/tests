<script setup lang="ts">
import { RoleForm } from "~/features/role"

const route = useRoute()
const isEdit = computed(() => route.params.id !== "create")

const onCancel = () => {
  navigateTo("/roles")
}
</script>

<template>
  <section class="flex w-full grow flex-col gap-4">
    <page-header
      description=""
      :label="isEdit ? $t('actions.edit') + ' ' + $t('labels.role') : $t('actions.add') + ' ' + $t('labels.role')"
      @back="onCancel"
    />
    <role-form />
  </section>
</template>
