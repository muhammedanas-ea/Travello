import { Navigate } from "react-router-dom";

export default function UserPublic(props) {
    if(localStorage.getItem('userToken')){
        return <Navigate to='/home' />
    }else{
        <Navigate to='/login'/>
        // eslint-disable-next-line react/prop-types
        return props.children;
    }
}


