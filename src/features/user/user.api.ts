import { IUser } from "~/entities/user";

export const useUserApi = () => {
  const BASE_URL = "/users";
  const { $http } = useNuxtApp();

  const getUserList = (params: Record<string, any>): AsyncResponseContainer<PageableResponse<IUser[]>> => {
    return $http.$get(BASE_URL, { params });
  };

  const getUserById = (id: number): AsyncResponseContainer<IUser> => {
    return $http.$get(`${BASE_URL}/${id}`);
  };

  const createUser = (payload: IUser): AsyncResponseContainer<IUser> => {
    return $http.$post(BASE_URL, payload);
  };

  const updateUser = (payload: IUser): AsyncResponseContainer<IUser> => {
    return $http.$put(`${BASE_URL}/${payload.id}`, payload);
  };

  const deleteUser = (id: number): AsyncResponseContainer<void> => {
    return $http.$delete(`${BASE_URL}/${id}`);
  };

  const changePassword = (id: number, payload: any): AsyncResponseContainer<any> => {
    return $http.$patch(`${BASE_URL}/${id}/change-password`, payload);
  };

  const changeStatus = (id: number, payload: { status: number | boolean }): AsyncResponseContainer<any> => {
    return $http.$patch(`${BASE_URL}/${id}/change-status`, payload);
  };

  return { getUserList, getUserById, createUser, updateUser, deleteUser, changePassword, changeStatus };
};
