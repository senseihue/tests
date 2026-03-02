import { IUser } from "./user.model"

export const useUserStore = createListStore<IUser>("user")
