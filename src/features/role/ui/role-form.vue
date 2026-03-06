<script setup lang="ts">
import { PermissionGrid } from "~/widgets/permission"
import { useRoleService } from "~/features/role"
import { Role } from "~/entities/role"

const route = useRoute()
const { t } = useI18n()
const { required } = useRule()
const { getRole, saveRole } = useRoleService()

const loading = ref(false)
const form = ref(new Role())
const rules = computed(() => ({
  name: {
    uz: { required },
    ru: { required },
    uzc: { required }
  },
  key: { required },
  permissions: { required }
}))

const { vuelidate, hasError } = useValidate(form, rules)

const isEdit = computed(() => !!route.params.id)

onMounted(() => {
  if (isEdit.value) {
    getRole(Number(route.params.id), form, loading)
  }
})

const onSubmit = async () => {
  const isValid = await vuelidate.value?.$validate()
  if (isValid) {
    saveRole(form, loading, () => {
      navigateTo("/roles")
    })
  }
}

const onCancel = () => {
  navigateTo("/roles")
}
</script>

<template>
  <div class="grow">
    <div class="app-container">
      <div v-if="loading && isEdit" class="flex justify-center p-8">
        <span class="text-sm text-gray-500">{{ $t("messages.info.loading") }}...</span>
      </div>

      <div v-else class="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
        <div class="col-span-1 flex flex-col gap-4 rounded-lg border bg-white p-6 shadow-sm">
          <h3 class="mb-2 border-b pb-2 text-lg font-semibold text-gray-800">{{ $t("labels.role") }}</h3>

          <ui-form-group v-slot="{ id }" v-bind="hasError('name.uz')" required :label="$t('labels.name_uz')">
            <ui-input v-model="form.name.uz" :id="id" :placeholder="t('placeholders.name_uz')" />
          </ui-form-group>

          <ui-form-group v-slot="{ id }" v-bind="hasError('name.ru')" required :label="$t('labels.name_ru')">
            <ui-input v-model="form.name.ru" :id="id" :placeholder="t('placeholders.name_ru')" />
          </ui-form-group>

          <ui-form-group v-slot="{ id }" v-bind="hasError('name.uzc')" required :label="$t('labels.name_uzc')">
            <ui-input v-model="form.name.uzc" :id="id" :placeholder="t('placeholders.name_uzc')" />
          </ui-form-group>

          <ui-form-group v-slot="{ id }" v-bind="hasError('key')" required :label="$t('labels.key')">
            <ui-input v-model="form.key" :id="id" :placeholder="t('placeholders.key')" />
          </ui-form-group>

          <ui-form-group v-slot="{ id }" v-bind="hasError('level')" :label="$t('labels.level')">
            <ui-input v-model="form.level" :id="id" :placeholder="t('placeholders.level')" />
          </ui-form-group>
        </div>

        <div class="col-span-1 flex flex-col gap-4 xl:col-span-2">
          <ui-form-group v-slot="{ id }" v-bind="hasError('permissions')">
            <permission-grid v-model="form.permissions" :id="id" />
          </ui-form-group>

          <div class="mt-4 flex justify-end gap-3">
            <ui-button variant="white" color="secondary" :label="$t('actions.cancel')" @click="onCancel" />
            <ui-button :label="$t('actions.save')" :loading="loading" @click="onSubmit" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
