<script setup lang="ts">
import { useUserStore } from "~/entities/user"
import { UserListMenu, useUserService } from "~/features/user"

const { t } = useI18n()
const modal = useModal()
const store = useUserStore()
const { getUserList, filterUserList, debouncedFilterUserList } = useUserService()
const { items, loading, params } = storeToRefs(store)

const cols = computed(() => [
  { name: "id", label: "ID", width: "80px" },
  { name: "first_name", label: t("labels.first_name") },
  { name: "last_name", label: t("labels.last_name") },
  { name: "login", label: t("labels.login") },
  { name: "phone", label: t("labels.phone") },
  { name: "status", label: t("labels.status") },
  { name: "actions", label: t("thead.actions"), labelClass: "justify-end", dataClass: "right-0", fixed: true }
])

const showModal = () => modal.show("user")
onMounted(() => getUserList())
</script>

<template>
  <div class="grow">
    <div class="app-container mb-4 flex gap-4">
      <ui-search-input v-model="params.keyword" @input="debouncedFilterUserList" @enter="filterUserList" />
      <ui-button class="ml-auto" :label="$t('actions.add')" @click="showModal()" />
    </div>
    <div class="app-container">
      <ui-table
        no-wrap
        rounded
        striped
        :loading="loading"
        :cols="cols"
        :rows="items"
        :empty-text="$t('placeholders.data_not_found')"
      >
        <template #actions="{ row }: any">
          <user-list-menu :id="row.id" :name="row.name" />
        </template>
      </ui-table>
    </div>
  </div>
  <ui-table-footer v-model:page="params.page" v-model:per-page="params.size" class="stuck" :total="params.total" />
</template>
