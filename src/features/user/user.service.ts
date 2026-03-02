import { debounce } from "lodash-es";
import { useUserApi } from "./user.api";
import { useUserStore } from "~/entities/user";
import { IUser, User } from "~/entities/user";

export const useUserService = () => {
  const api = useUserApi();
  const store = useUserStore();
  const alert = useAlert();
  const modal = useModal();
  const { t } = useI18n();
  const { $toast } = useNuxtApp();

  const getUserList = () => {
    store.loading = true;
    api.getUserList(cleanParams(store.params)).then(({ data }) => {
      store.items = data.models;
      store.params.total = data.meta?.total ?? 0;
    }).finally(() => (store.loading = false));
  };

  const filterUserList = () => { store.params.page = 0; getUserList(); };
  const debouncedFilterUserList = debounce(filterUserList, 600);

  const getUser = (id: number, dto: Ref<IUser>, loading: Ref<boolean>) => {
    loading.value = true;
    api.getUserById(id).then(({ data }) => (dto.value = data)).finally(() => (loading.value = false));
  };

  const saveUser = (dto: Ref<IUser>, loading: Ref<boolean>) => {
    loading.value = true;
    const action = dto.value.id ? api.updateUser : api.createUser;
    action(dto.value).then(() => { modal.hide("user"); $toast.success(t("messages.success.saved")); getUserList(); }).finally(() => (loading.value = false));
  };

  const deleteUser = (id: number, name: string) => {
    alert.confirmDelete().then((isConfirmed) => {
      if (isConfirmed) {
        store.loading = true;
        api.deleteUser(id).then(() => { $toast.success(t("messages.info.entity_deleted", { name })); getUserList(); }).finally(() => (store.loading = false));
      }
    });
  };

  const changeUserStatus = (id: number, status: number | boolean) => {
    store.loading = true;
    api.changeStatus(id, { status }).then(() => {
      $toast.success(t("messages.success.saved"));
      getUserList();
    }).finally(() => (store.loading = false));
  };

  const changeUserPassword = (id: number, payload: any, loading: Ref<boolean>) => {
    loading.value = true;
    api.changePassword(id, payload).then(() => {
      modal.hide("user-password");
      $toast.success(t("messages.success.saved"));
    }).finally(() => (loading.value = false));
  };

  return { getUserList, filterUserList, debouncedFilterUserList, getUser, saveUser, deleteUser, changeUserStatus, changeUserPassword };
};
