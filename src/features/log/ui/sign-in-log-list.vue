<script setup lang="ts">
import { useSignInLogStore } from "~/entities/log";
import { useLogService } from "~/features/log";

const { t } = useI18n();
const store = useSignInLogStore();
const { getSignInLogs, filterSignInLogs, debouncedFilterSignInLogs } = useLogService();
const { items, loading, params } = storeToRefs(store);

const cols = computed(() => [
  { name: "id", label: "ID" },
  { name: "ip_address", label: t("labels.ip_address") },
  { name: "user_agent", label: t("labels.user_agent") },
  { name: "login_at", label: t("labels.login_at") },
  { name: "login_successful", label: t("labels.login_successful") }
]);

onMounted(() => getSignInLogs());
</script>

<template>
  <div class="grow">
    <div class="app-container mb-4 flex gap-4">
      <ui-search-input v-model="params.keyword" @input="debouncedFilterSignInLogs" @enter="filterSignInLogs" />
    </div>
    <div class="app-container">
      <ui-table no-wrap rounded striped :loading="loading" :cols="cols" :rows="items" :empty-text="$t('placeholders.data_not_found')">
        <template #login_successful="{ row }: any">
          <ui-badge variant="solid" :color="row.login_successful ? 'primary' : 'danger'">
            {{ row.login_successful ? $t('labels.success') : $t('labels.fail') }}
          </ui-badge>
        </template>
      </ui-table>
    </div>
  </div>
  <ui-table-footer v-model:page="params.page" v-model:per-page="params.size" class="stuck" :total="params.total" />
</template>
