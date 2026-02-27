import { Profile, ProfilePassword } from "~/entities/profile"

export const useProfileApi = () => {
  const BASE_URL = ""
  const { $http } = useNuxtApp()

  const getProfile = (): AsyncResponseContainer<ISessionProfile> => {
    return $http.$get(`${BASE_URL}/me`)
  }

  const updateProfile = (payload: Profile): AsyncResponseContainer<ISessionProfile> => {
    return $http.$put(BASE_URL, payload)
  }

  const changeProfilePassword = (payload: ProfilePassword): AsyncResponseContainer => {
    return $http.$put(`${BASE_URL}/change-password`, payload)
  }

  return { getProfile, updateProfile, changeProfilePassword }
}
