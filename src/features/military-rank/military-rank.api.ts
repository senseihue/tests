import { type IAsyncResponseContainer } from "~/shared/api"

export interface IMilitaryRank {
    id: number
    name: string
}

export const useMilitaryRankApi = () => {
    const BASE_URL = "/military-ranks"
    const { $http } = useNuxtApp()

    const getMilitaryRankList = (params: Record<string, any>): IAsyncResponseContainer<IMilitaryRank[]> => {
        return $http.$get(BASE_URL, { params })
    }

    return { getMilitaryRankList }
}
