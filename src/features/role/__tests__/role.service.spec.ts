import { describe, it, expect, vi, beforeEach } from "vitest"
import { useRoleService } from "../role.service"
import { useRoleApi } from "../role.api"
import { useRoleStore } from "~/entities/role"
import { ref } from "vue"

// Mocks
vi.mock("~/entities/role", () => ({
  useRoleStore: vi.fn()
}))
vi.mock("../role.api")

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

describe("Role Service", () => {
  let mockApi: any
  let mockStore: any

  beforeEach(() => {
    mockApi = {
      getRoleList: vi.fn().mockResolvedValue({ data: { models: [{ id: 1, name: { uz: "Admin uz", ru: "Admin ru", uzc: "Admin uzc" } }], meta: { total: 1 } } }),
      getRoleById: vi.fn().mockResolvedValue({ data: { id: 1, name: { uz: "Admin uz", ru: "Admin ru", uzc: "Admin uzc" } } }),
      createRole: vi.fn().mockResolvedValue({}),
      updateRole: vi.fn().mockResolvedValue({}),
      deleteRole: vi.fn().mockResolvedValue({})
    }

    mockStore = {
      items: [],
      loading: false,
      params: { page: 0, size: 20, total: 0 }
    }
      ; (useRoleApi as any).mockReturnValue(mockApi)
      ; (useRoleStore as any).mockReturnValue(mockStore)
    vi.clearAllMocks()
  })

  it("should fetch role list and update store", async () => {
    const { getRoleList } = useRoleService()

    getRoleList()

    // Simulate promise resolution
    await new Promise(process.nextTick)

    expect(mockApi.getRoleList).toHaveBeenCalledWith(mockStore.params)
    expect(mockStore.items).toEqual([{ id: 1, name: { uz: "Admin uz", ru: "Admin ru", uzc: "Admin uzc" } }])
    expect(mockStore.params.total).toBe(1)
    expect(mockStore.loading).toBe(false)
  })

  it("should get role by id and update dto", async () => {
    const { getRole } = useRoleService()
    const dto = ref<any>({})
    const loading = ref(false)

    getRole(1, dto, loading)

    await new Promise(process.nextTick)

    expect(mockApi.getRoleById).toHaveBeenCalledWith(1)
    expect(dto.value.id).toBe(1)
    expect(loading.value).toBe(false)
  })

  it("should call createRole when dto has no id", async () => {
    const { saveRole } = useRoleService()
    const dto = ref<any>({ name: { uz: "Manager uz", ru: "Manager ru", uzc: "Manager uzc" }, key: "manager", level: "military_unit", permissions: [1, 2] })
    const loading = ref(false)

    saveRole(dto, loading)

    await new Promise(process.nextTick)

    expect(mockApi.createRole).toHaveBeenCalledWith(dto.value)
    expect(loading.value).toBe(false)
  })

  it("should call updateRole when dto has an id", async () => {
    const { saveRole } = useRoleService()
    const dto = ref<any>({ id: 2, name: { uz: "Manager uz", ru: "Manager ru", uzc: "Manager uzc" }, key: "manager", level: "military_unit", permissions: [1, 2] })
    const loading = ref(false)

    saveRole(dto, loading)

    await new Promise(process.nextTick)

    expect(mockApi.updateRole).toHaveBeenCalledWith(dto.value)
    expect(loading.value).toBe(false)
  })

  it("should delete role after confirmation", async () => {
    const { deleteRole } = useRoleService()

    deleteRole(1, "Manager")

    await new Promise(process.nextTick)
    // Extra tick for alert resolution
    await new Promise(process.nextTick)

    expect(mockApi.deleteRole).toHaveBeenCalledWith(1)
    expect(mockStore.loading).toBe(false)
  })
})
