<script setup lang="ts">
import { useRoleService } from "~/features/role"
import { Role } from "~/entities/role"
import PermissionSelect from "~/widgets/permission/ui/permission-select.vue"

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

const onShow = (args?: any) => {
  const { id } = args || {}
  if (id) getRole(id, form, loading)
  else form.value = new Role()
}

const onHide = () => {
  loading.value = false
  form.value = new Role()
  vuelidate.value?.$reset()
}

const onSubmit = async () => {
  const isValid = await vuelidate.value?.$validate()
  if (isValid) saveRole(form, loading)
}
</script>

<template>
  <ui-modal id="role" :label="$t('labels.role')" :loading @show="onShow" @hide="onHide">
    <div class="grid gap-4 p-4">
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

      <ui-form-group v-slot="{ id }" v-bind="hasError('permissions')" required :label="$t('labels.permissions')">
        <permission-select v-model="form.permissions" :id="id" />
      </ui-form-group>
    </div>

    <template #footer="{ hide }">
      <div class="ui-modal-footer">
        <ui-button variant="white" color="secondary" :label="$t('actions.cancel')" @click="hide" />
        <ui-button :label="$t('actions.save')" @click="onSubmit" />
      </div>
    </template>
  </ui-modal>
</template>
