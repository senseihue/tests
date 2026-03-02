<script setup lang="ts">
import { useActivityLogStore } from "~/entities/log";
import { useLogService } from "~/features/log";

const { t } = useI18n();
const store = useActivityLogStore();
const { getActivityLogs, filterActivityLogs, debouncedFilterActivityLogs } = useLogService();
const { items, loading, params } = storeToRefs(store);

const cols = computed(() => [
  { name: "id", label: "ID" },
  { name: "causer_type", label: t("labels.causer_type") },
  { name: "causer_id", label: t("labels.causer_id") },
  { name: "description", label: t("labels.description") },
  { name: "subject_type", label: t("labels.subject_type") },
  { name: "subject_id", label: t("labels.subject_id") },
  { name: "created_at", label: t("labels.created_at") }
]);

onMounted(() => getActivityLogs());
</script>

<template>
  <div class="grow">
    <div class="app-container mb-4 flex gap-4">
      <ui-search-input v-model="params.keyword" @input="debouncedFilterActivityLogs" @enter="filterActivityLogs" />
    </div>
    <div class="app-container">
      <ui-table no-wrap rounded striped :loading="loading" :cols="cols" :rows="items" :empty-text="$t('placeholders.data_not_found')">
      </ui-table>
    </div>
  </div>
  <ui-table-footer v-model:page="params.page" v-model:per-page="params.size" class="stuck" :total="params.total" />
</template>
