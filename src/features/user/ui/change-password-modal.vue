<script setup lang="ts">
import { useUserService } from "~/features/user"

const { t } = useI18n()
const { required, minLength, sameAs } = useRule()
const { changeUserPassword } = useUserService()

const loading = ref(false)
const id = ref<number>(0)
const form = ref({
  password: "",
  password_confirmation: ""
})

const rules = computed(() => ({
  password: { required, minLength: minLength(6) },
  password_confirmation: { required, sameAs: sameAs(form.value.password) }
}))

const { vuelidate, hasError } = useValidate(form, rules)

const onShow = (args?: any) => {
  if (args?.id) id.value = args.id;
}

const onHide = () => {
  id.value = 0
  loading.value = false
  form.value = { password: "", password_confirmation: "" }
  vuelidate.value?.$reset()
}

const onSave = async () => {
  const isValid = await vuelidate.value?.$validate()
  if (isValid) changeUserPassword(id.value, form.value, loading)
}
</script>

<template>
  <ui-modal
    id="user-password"
    :label="$t('labels.change_password')"
    :loading="loading"
    :close-on-backdrop="false"
    @show="onShow"
    @hide="onHide"
  >
    <div class="grid grid-cols-1 gap-4 p-4">
      <ui-form-group v-slot="{ id }" v-bind="hasError('password')" required :label="$t('labels.new_password')">
        <ui-password-input v-model="form.password" autocomplete="new-password" :id />
      </ui-form-group>

      <ui-form-group v-slot="{ id }" v-bind="hasError('password_confirmation')" required :label="$t('labels.password_confirmation')">
        <ui-password-input v-model="form.password_confirmation" autocomplete="new-password" :id />
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
