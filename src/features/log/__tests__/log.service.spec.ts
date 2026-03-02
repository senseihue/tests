import { describe, it, expect, vi, beforeEach } from "vitest"
import { useLogService } from "../log.service"
import { useLogApi } from "../log.api"
import { useActivityLogStore, useSignInLogStore } from "~/entities/log"

vi.mock("~/entities/log", () => ({
    useActivityLogStore: vi.fn(),
    useSignInLogStore: vi.fn()
}))
vi.mock("../log.api")

vi.stubGlobal("cleanParams", (params: any) => params)

describe("Log Service", () => {
    let mockApi: any
    let mockActivityStore: any
    let mockSignInStore: any

    beforeEach(() => {
        mockApi = {
            getActivityLogs: vi.fn().mockResolvedValue({ data: { models: [{ id: 1, description: "Login" }], meta: { total: 1 } } }),
            getSignInLogs: vi.fn().mockResolvedValue({ data: { models: [{ id: 1, ip_address: "127.0.0.1" }], meta: { total: 1 } } })
        }

        mockActivityStore = {
            items: [],
            loading: false,
            params: { page: 0, size: 20, total: 0 }
        }

        mockSignInStore = {
            items: [],
            loading: false,
            params: { page: 0, size: 20, total: 0 }
        }

            ; (useLogApi as any).mockReturnValue(mockApi)
            ; (useActivityLogStore as any).mockReturnValue(mockActivityStore)
            ; (useSignInLogStore as any).mockReturnValue(mockSignInStore)

        vi.clearAllMocks()
    })

    it("should fetch activity logs and update store", async () => {
        const { getActivityLogs } = useLogService()

        getActivityLogs()
        await new Promise(process.nextTick)

        expect(mockApi.getActivityLogs).toHaveBeenCalledWith(mockActivityStore.params)
        expect(mockActivityStore.items).toEqual([{ id: 1, description: "Login" }])
        expect(mockActivityStore.params.total).toBe(1)
        expect(mockActivityStore.loading).toBe(false)
    })

    it("should fetch sign-in logs and update store", async () => {
        const { getSignInLogs } = useLogService()

        getSignInLogs()
        await new Promise(process.nextTick)

        expect(mockApi.getSignInLogs).toHaveBeenCalledWith(mockSignInStore.params)
        expect(mockSignInStore.items).toEqual([{ id: 1, ip_address: "127.0.0.1" }])
        expect(mockSignInStore.params.total).toBe(1)
        expect(mockSignInStore.loading).toBe(false)
    })
})
