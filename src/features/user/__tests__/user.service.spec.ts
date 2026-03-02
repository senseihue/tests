import { describe, it, expect, vi, beforeEach } from "vitest"
import { useUserService } from "../user.service"
import { useUserApi } from "../user.api"
import { useUserStore } from "~/entities/user"
import { ref } from "vue"

// Mocks
vi.mock("~/entities/user", () => ({
    useUserStore: vi.fn(),
    User: class { id = 0 }
}))
vi.mock("../user.api")

const mockConfirmDelete = vi.fn().mockResolvedValue(true)
const mockModalShow = vi.fn()
const mockModalHide = vi.fn()
const mockTranslate = (key: string) => key
const mockToastSuccess = vi.fn()

vi.stubGlobal("useAlert", () => ({ confirmDelete: mockConfirmDelete }))
vi.stubGlobal("useModal", () => ({ show: mockModalShow, hide: mockModalHide, payload: vi.fn().mockReturnValue({}) }))
vi.stubGlobal("useI18n", () => ({ t: mockTranslate }))
vi.stubGlobal("useNuxtApp", () => ({ $toast: { success: mockToastSuccess } }))
vi.stubGlobal("cleanParams", (params: any) => params)

describe("User Service", () => {
    let mockApi: any
    let mockStore: any

    beforeEach(() => {
        mockApi = {
            getUserList: vi.fn().mockResolvedValue({ data: { models: [{ id: 1, first_name: "Super", last_name: "Admin" }], meta: { total: 1 } } }),
            getUserById: vi.fn().mockResolvedValue({ data: { id: 1, first_name: "Super", last_name: "Admin" } }),
            createUser: vi.fn().mockResolvedValue({}),
            updateUser: vi.fn().mockResolvedValue({}),
            deleteUser: vi.fn().mockResolvedValue({}),
            changeStatus: vi.fn().mockResolvedValue({}),
            changePassword: vi.fn().mockResolvedValue({})
        }

        mockStore = {
            items: [],
            loading: false,
            params: { page: 0, size: 20, total: 0 }
        }
            ; (useUserApi as any).mockReturnValue(mockApi)
            ; (useUserStore as any).mockReturnValue(mockStore)
        vi.clearAllMocks()
    })

    it("should fetch user list and update store", async () => {
        const { getUserList } = useUserService()

        getUserList()
        await new Promise(process.nextTick)

        expect(mockApi.getUserList).toHaveBeenCalledWith(mockStore.params)
        expect(mockStore.items).toEqual([{ id: 1, first_name: "Super", last_name: "Admin" }])
        expect(mockStore.params.total).toBe(1)
        expect(mockStore.loading).toBe(false)
    })

    it("should get user by id and update dto", async () => {
        const { getUser } = useUserService()
        const dto = ref<any>({})
        const loading = ref(false)

        getUser(1, dto, loading)
        await new Promise(process.nextTick)

        expect(mockApi.getUserById).toHaveBeenCalledWith(1)
        expect(dto.value.id).toBe(1)
        expect(loading.value).toBe(false)
    })

    it("should call createUser when dto has no id", async () => {
        const { saveUser } = useUserService()
        const dto = ref<any>({ first_name: "New" })
        const loading = ref(false)

        saveUser(dto, loading)
        await new Promise(process.nextTick)

        expect(mockApi.createUser).toHaveBeenCalledWith(dto.value)
        expect(loading.value).toBe(false)
    })

    it("should call updateUser when dto has an id", async () => {
        const { saveUser } = useUserService()
        const dto = ref<any>({ id: 2, first_name: "Updated" })
        const loading = ref(false)

        saveUser(dto, loading)
        await new Promise(process.nextTick)

        expect(mockApi.updateUser).toHaveBeenCalledWith(dto.value)
        expect(loading.value).toBe(false)
    })

    it("should delete user after confirmation", async () => {
        const { deleteUser } = useUserService()

        deleteUser(1, "Super Admin")

        await new Promise(process.nextTick)
        await new Promise(process.nextTick)

        expect(mockApi.deleteUser).toHaveBeenCalledWith(1)
        expect(mockStore.loading).toBe(false)
    })

    it("should change user status", async () => {
        const { changeUserStatus } = useUserService()

        changeUserStatus(1, 1)

        await new Promise(process.nextTick)

        expect(mockApi.changeStatus).toHaveBeenCalledWith(1, { status: 1 })
        expect(mockStore.loading).toBe(false)
        expect(mockToastSuccess).toHaveBeenCalled()
    })

    it("should change user password and hide modal", async () => {
        const { changeUserPassword } = useUserService()
        const loading = ref(false)

        changeUserPassword(1, { password: "new" }, loading)

        await new Promise(process.nextTick)

        expect(mockApi.changePassword).toHaveBeenCalledWith(1, { password: "new" })
        expect(loading.value).toBe(false)
        expect(mockModalHide).toHaveBeenCalledWith("user-password")
        expect(mockToastSuccess).toHaveBeenCalled()
    })
})
