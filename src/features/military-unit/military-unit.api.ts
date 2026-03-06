import { type IAsyncResponseContainer } from "~/shared/api"

export interface IMilitaryUnit {
    id: number
    name: string
}

export const useMilitaryUnitApi = () => {
    const BASE_URL = "/military-units"
    const { $http } = useNuxtApp()

    const getMilitaryUnitList = (params: Record<string, any>): IAsyncResponseContainer<IMilitaryUnit[]> => {
        return $http.$get(BASE_URL, { params })
    }

    return { getMilitaryUnitList }
}
