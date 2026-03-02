import { IActivityLog, ISignInLog } from "~/entities/log";

export const useLogApi = () => {
    const { $http } = useNuxtApp();

    const getActivityLogs = (params: Record<string, any>): AsyncResponseContainer<PageableResponse<IActivityLog[]>> => {
        return $http.$get("/logs/activity", { params });
    };

    const getSignInLogs = (params: Record<string, any>): AsyncResponseContainer<PageableResponse<ISignInLog[]>> => {
        return $http.$get("/logs/sign-in", { params });
    };

    return { getActivityLogs, getSignInLogs };
};
