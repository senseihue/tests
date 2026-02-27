import { Role } from "~/entities/role"

export const useRoleApi = () => {
  const BASE_URL = "/roles"
  const { $http } = useNuxtApp()

  const getRoleList = (params: Record<string, any>): AsyncResponseContainer<PageableResponse<IRole[]>> => {
    return $http.$get(BASE_URL, { params })
  }

  const getRoleById = (id: number): AsyncResponseContainer<IRole> => {
    return $http.$get(`${BASE_URL}/${id}`)
  }

  const createRole = (payload: Role): AsyncResponseContainer<IRole> => {
    return $http.$post(BASE_URL, payload)
  }

  const updateRole = (payload: Role): AsyncResponseContainer<IRole> => {
    return $http.$put(`${BASE_URL}/${payload.id}`, payload)
  }

  const deleteRole = (id: number): AsyncResponseContainer => {
    return $http.$delete(`${BASE_URL}/${id}`)
  }

  return {
    getRoleList,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
  }
}
