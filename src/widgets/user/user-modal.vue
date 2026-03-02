<script setup lang="ts">
import { useUserService } from "~/features/user"
import { User } from "~/entities/user"
import { RoleSelect } from "~/features/role"

const { t } = useI18n()
const { required, requiredIf, minLength } = useRule()
const { getUser, saveUser } = useUserService()

const editing = ref(false)
const loading = ref(false)
const form = ref(new User())

const rules = computed(() => ({
  first_name: { required },
  last_name: { required },
  patronymic: {},
  login: { required },
  passport: {},
  tin: {},
  phone: {},
  role_id: { required },
  password: { requiredIf: requiredIf(() => !editing.value), minLength: minLength(6) },
  status: { required }
}))

const { vuelidate, hasError } = useValidate(form as any, rules as any)

const label = computed(() => (editing.value ? t("actions.edit") : t("actions.add")))

const onShow = (args?: any) => {
  const { id } = args || {}
  if (id) {
    editing.value = true
    getUser(id, form, loading)
  } else {
    editing.value = false
    form.value = new User()
  }
}

const onHide = () => {
  editing.value = false
  loading.value = false
  form.value = new User()
  vuelidate.value?.$reset()
}

const onSave = async () => {
  const isValid = await vuelidate.value?.$validate()
  if (isValid) saveUser(form, loading)
}
</script>

<template>
  <ui-modal
    id="user"
    :label="label"
    :loading="loading"
    :close-on-backdrop="false"
    @show="onShow"
    @hide="onHide"
  >
    <div class="grid grid-cols-2 gap-4 p-4">
      <ui-form-group v-slot="{ id }" v-bind="hasError('first_name')" required :label="$t('labels.first_name')">
        <ui-input v-model="form.first_name" :id />
      </ui-form-group>

      <ui-form-group v-slot="{ id }" v-bind="hasError('last_name')" required :label="$t('labels.last_name')">
        <ui-input v-model="form.last_name" :id />
      </ui-form-group>

      <ui-form-group v-slot="{ id }" v-bind="hasError('patronymic')" :label="$t('labels.patronymic')">
        <ui-input v-model="form.patronymic" :id />
      </ui-form-group>

      <ui-form-group v-slot="{ id }" v-bind="hasError('login')" required :label="$t('labels.login')">
        <ui-input v-model="form.login" :id autocomplete="off" />
      </ui-form-group>
      
      <ui-form-group v-slot="{ id }" v-bind="hasError('passport')" :label="$t('labels.passport')">
        <ui-input v-model="form.passport" :id />
      </ui-form-group>

      <ui-form-group v-slot="{ id }" v-bind="hasError('tin')" :label="$t('labels.tin')">
        <ui-input v-model="form.tin" :id />
      </ui-form-group>
      
      <ui-form-group v-slot="{ id }" v-bind="hasError('phone')" :label="$t('labels.phone')">
        <ui-mask-input v-model="(form.phone as string | undefined)" mask="+### (##) ###-##-##" :id />
      </ui-form-group>

      <ui-form-group v-slot="{ id }" v-bind="hasError('role_id')" required :label="$t('labels.role')">
        <role-select v-model="form.role_id" append-to-body :id />
      </ui-form-group>

      <ui-form-group
        v-if="!editing"
        v-slot="{ id }"
        v-bind="hasError('password')"
        required
        :label="$t('labels.password')"
      >
        <ui-password-input v-model="form.password" autocomplete="new-password" :id />
      </ui-form-group>
    </div>

    <template #footer="{ hide }">
      <div class="ui-modal-footer">
        <ui-button variant="white" color="secondary" :label="$t('actions.cancel')" @click="hide" />
        <ui-button :label="$t('actions.save')" @click="onSave" />
      </div>
    </template>
  </ui-modal>
</template>
