import { Navigate, Outlet } from "react-router-dom"

export default function AdminProtected() {
    if (localStorage.getItem('adminToken')) {
        return <Outlet />
    } else {
        return <Navigate to='/admin/login' />
    }
}
