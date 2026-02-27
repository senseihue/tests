import { IPermissionGroup } from "~/entities/permission"

export const usePermissionApi = () => {
    const BASE_URL = "/permissions-group-by"
    const { $http } = useNuxtApp()

    const getPermissionsGroupBy = (): AsyncResponseContainer<IPermissionGroup[]> => {
        return $http.$get(BASE_URL)
    }

    return { getPermissionsGroupBy }
}
