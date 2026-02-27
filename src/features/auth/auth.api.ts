import { SignIn } from "~/entities/auth"

export const useAuthApi = () => {
  const BASE_URL = ""
  const { $http } = useNuxtApp()

  const signIn = (payload: SignIn): AsyncResponseContainer<ISignIn> => {
    return $http.$post(`${BASE_URL}/login`, payload)
  }

  return { signIn }
}
