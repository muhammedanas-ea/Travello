import { Navigate, Outlet } from "react-router-dom"

export default function PropertyProtected() {
    if (localStorage.getItem('propertyToken')) {
        return <Outlet />
    } else {
        return <Navigate to='/property/login' />
    }
}
