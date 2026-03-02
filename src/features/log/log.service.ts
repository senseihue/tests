import { debounce } from "lodash-es";
import { useLogApi } from "./log.api";
import { useActivityLogStore, useSignInLogStore } from "~/entities/log";

export const useLogService = () => {
    const api = useLogApi();
    const activityStore = useActivityLogStore();
    const signInStore = useSignInLogStore();

    const getActivityLogs = () => {
        activityStore.loading = true;
        api.getActivityLogs(cleanParams(activityStore.params)).then(({ data }) => {
            activityStore.items = data.models;
            activityStore.params.total = data.meta?.total ?? 0;
        }).finally(() => (activityStore.loading = false));
    };

    const filterActivityLogs = () => { activityStore.params.page = 0; getActivityLogs(); };
    const debouncedFilterActivityLogs = debounce(filterActivityLogs, 600);

    const getSignInLogs = () => {
        signInStore.loading = true;
        api.getSignInLogs(cleanParams(signInStore.params)).then(({ data }) => {
            signInStore.items = data.models;
            signInStore.params.total = data.meta?.total ?? 0;
        }).finally(() => (signInStore.loading = false));
    };

    const filterSignInLogs = () => { signInStore.params.page = 0; getSignInLogs(); };
    const debouncedFilterSignInLogs = debounce(filterSignInLogs, 600);

    return {
        getActivityLogs, filterActivityLogs, debouncedFilterActivityLogs,
        getSignInLogs, filterSignInLogs, debouncedFilterSignInLogs
    };
};
