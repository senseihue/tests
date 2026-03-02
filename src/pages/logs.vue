<script setup lang="ts">
import { LogList } from "~/features/log";

const { t } = useI18n();
useHead({ title: t("labels.log") });
</script>

<template>
  <section class="flex w-full flex-col gap-4">
    <page-header :label="$t('labels.logs')" :description="$t('descriptions.logs')" />
    <log-list />
  </section>
</template>
