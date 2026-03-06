<script setup lang="ts">
import { useRoleService } from "~/features/role"

interface IProps {
  id: number
  name: string
}

const props = defineProps<IProps>()

const modal = useModal()
const router = useRouter()
const localePath = useLocalePath()
const { deleteRole } = useRoleService()

const showRoleModal = () => router.push(localePath(`/roles/form/${props.id}`))
</script>

<template>
  <ui-button-group>
    <ui-icon-button
      size="sm"
      variant="white"
      color="secondary"
      icon-class="text-xl"
      icon-name="lucide:pencil-line"
      :label="$t('actions.edit')"
      @click="showRoleModal"
    />

    <ui-icon-button
      size="sm"
      variant="white"
      color="danger"
      icon-class="text-lg"
      icon-name="lucide:trash-2"
      :label="$t('actions.delete')"
      @click="deleteRole(id, name)"
    />
  </ui-button-group>
</template>
