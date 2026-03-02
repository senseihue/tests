<script setup lang="ts">
import { useUserService } from "~/features/user";

interface IProps {
  id: number;
  name: string;
}

const props = defineProps<IProps>();

const modal = useModal();
const { deleteUser } = useUserService();

const showUserModal = () => modal.show("user", { id: props.id });
</script>

<template>
  <ui-action-button @edit="showUserModal" @delete="deleteUser(id, name)" />
</template>
