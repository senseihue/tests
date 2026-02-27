import { usePermissionApi } from "./permission.api"
import { IPermissionGroup } from "~/entities/permission"

export const usePermissionService = () => {
    const api = usePermissionApi()
    const loading = ref(false)

    const getPermissionsGroupBy = (items: Ref<IPermissionGroup[]>) => {
        loading.value = true
        return api.getPermissionsGroupBy().then(({ data }) => {
            // API returns the models array nested inside `data.models`
            items.value = (data as any).models || data || []
        }).finally(() => {
            loading.value = false
        })
    }

    return { getPermissionsGroupBy, loading }
}
