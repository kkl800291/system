
// 参数：这个按钮哪些权限可以显示
export const isRole = (roles) => {
    // 本地取出当前账号的权限
    let curRole = localStorage.getItem('role') || 'normal'
    if (roles.includes(curRole)) {
        return true
    }
    return false
}