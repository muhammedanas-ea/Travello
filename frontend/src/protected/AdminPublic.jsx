import { Navigate, Outlet } from "react-router-dom";

export default function AdminPublic() {
    if (localStorage.getItem('adminToken')) {
        return <Navigate to='/admin' />
    } else {
        return <Outlet />
    }
}


