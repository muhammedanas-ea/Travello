import { Navigate } from "react-router-dom"

export default function UserProtected(props) {
  if(localStorage.getItem('userToken')){
    return props.children
  }else{
    <Navigate to='/home' />
  }
}
