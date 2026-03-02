import { createListStore } from "~/shared/stores/list.store";
import { IActivityLog, ISignInLog } from "./log.model";

export const useActivityLogStore = createListStore<IActivityLog>("activityLog");
export const useSignInLogStore = createListStore<ISignInLog>("signInLog");
