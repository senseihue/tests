<script setup lang="ts">
import { useUserService } from "~/features/user"
import { User } from "~/entities/user"
import { RoleSelect } from "~/features/role"
import { MilitaryDistrictSelect } from "~/widgets/military-district"
import { MilitaryUnitSelect } from "~/widgets/military-unit"
import { MilitaryPositionSelect } from "~/widgets/military-position"
import { MilitaryRankSelect } from "~/widgets/military-rank"

const { t } = useI18n()
const { required, requiredIf, minLength } = useRule()
const { getUser, saveUser } = useUserService()

const editing = ref(false)
const loading = ref(false)
const form = ref(new User())

const rules = computed(() => ({
  first_name: { required },
  last_name: { required },
  login: { required },
  passport: { required },
  tin: { required },
  role_id: { required },
  password: { requiredIf: requiredIf(() => !editing.value), minLength: minLength(6) }
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
  <ui-modal id="user" :label="label" :loading="loading" :close-on-backdrop="false" @show="onShow" @hide="onHide">
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
        <ui-input v-model="form.login" autocomplete="off" :id />
      </ui-form-group>

      <ui-form-group v-slot="{ id }" v-bind="hasError('passport')" :label="$t('labels.passport')">
        <ui-input v-model="form.passport" :id />
      </ui-form-group>

      <ui-form-group v-slot="{ id }" v-bind="hasError('tin')" :label="$t('labels.tin')">
        <ui-input v-model="form.tin" :id />
      </ui-form-group>

      <ui-form-group v-slot="{ id }" v-bind="hasError('military_number')" :label="$t('labels.military_number')">
        <ui-input v-model="form.military_number" :id />
      </ui-form-group>

      <ui-form-group
        v-slot="{ id }"
        v-bind="hasError('military_district_id')"
        :label="$t('labels.military_district_id')"
      >
        <military-district-select v-model="form.military_district_id" append-to-body :id />
      </ui-form-group>

      <ui-form-group v-slot="{ id }" v-bind="hasError('military_unit_id')" :label="$t('labels.military_unit_id')">
        <military-unit-select v-model="form.military_unit_id" append-to-body :id />
      </ui-form-group>

      <ui-form-group
        v-slot="{ id }"
        v-bind="hasError('military_position_id')"
        :label="$t('labels.military_position_id')"
      >
        <military-position-select v-model="form.military_position_id" append-to-body :id />
      </ui-form-group>

      <ui-form-group v-slot="{ id }" v-bind="hasError('military_rank_id')" :label="$t('labels.military_rank_id')">
        <military-rank-select v-model="form.military_rank_id" append-to-body :id />
      </ui-form-group>

      <ui-form-group v-slot="{ id }" v-bind="hasError('phone')" :label="$t('labels.phone')">
        <ui-mask-input v-model="form.phone as string | undefined" mask="+### (##) ###-##-##" :id />
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
