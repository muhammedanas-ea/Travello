import { Navigate, Outlet } from "react-router-dom";

export default function PropertyPublic() {
    if (localStorage.getItem('propertyToken')) {
        return <Navigate to='/property' />
    } else {
        return <Outlet />
    }
}


