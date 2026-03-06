import { type IAsyncResponseContainer } from "~/shared/api"

export interface IMilitaryPosition {
    id: number
    name: string
}

export const useMilitaryPositionApi = () => {
    const BASE_URL = "/military-positions"
    const { $http } = useNuxtApp()

    const getMilitaryPositionList = (params: Record<string, any>): IAsyncResponseContainer<IMilitaryPosition[]> => {
        return $http.$get(BASE_URL, { params })
    }

    return { getMilitaryPositionList }
}
