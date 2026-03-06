import { type IAsyncResponseContainer } from "~/shared/api"

export interface IMilitaryDistrict {
    id: number
    name: string
}

export const useMilitaryDistrictApi = () => {
    const BASE_URL = "/military-districts"
    const { $http } = useNuxtApp()

    const getMilitaryDistrictList = (params: Record<string, any>): IAsyncResponseContainer<IMilitaryDistrict[]> => {
        return $http.$get(BASE_URL, { params })
    }

    return { getMilitaryDistrictList }
}
