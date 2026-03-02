import { useReCaptcha } from "vue-recaptcha-v3"
import { useAuthApi } from "~/features/auth"
import type { SignIn } from "~/entities/auth"

export const useAuthService = () => {
  const authApi = useAuthApi()
  const router = useRouter()
  const localePath = useLocalePath()

  const { $session } = useNuxtApp()

  const signIn = async (payload: Ref<SignIn>, loading: Ref<boolean>) => {
    if (loading.value) return

    loading.value = true

    authApi
      .signIn(payload.value)
      .then(({ data }) => {
        if (!data.token) return
        const token = useCookie("token")
        token.value = data.token
        console.log("Sign in successful", { token: token.value })
        navigateTo(localePath("/"))
      })
      .finally(() => (loading.value = false))
  }

  return { signIn }
}
