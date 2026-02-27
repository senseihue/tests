export interface IPermissionItem {
    id: number
    name: string
    action: string
}

export interface IPermissionGroup {
    id: number
    name: string
    department: {
        id: number
        name: string
    }
    permissions: IPermissionItem[]
}

declare global {
    interface IModal {
        permission: any
    }
}
