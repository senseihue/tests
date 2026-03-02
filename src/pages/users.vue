<script setup lang="ts">
import { UserList } from "~/features/user";

const { t } = useI18n();
useHead({ title: t("labels.user") });
</script>

<template>
  <section class="flex w-full flex-col gap-4">
    <page-header :label="$t('labels.users')" :description="$t('descriptions.users')" />
    <user-list />
  </section>
</template>
