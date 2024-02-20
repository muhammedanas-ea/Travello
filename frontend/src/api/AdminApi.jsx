import axiosInterceptorInstanceAdmin from '../utils/AdminMiddleware'
const adminApi = axiosInterceptorInstanceAdmin


export async function UserDetails(active, search) {
  try {
    const data = await adminApi.get(`/userlist/${active}/${search}`);
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function AdminLoginVerify(loginData) {
  try {
    const data = await adminApi.post("/adminLogin", loginData);
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function UserBlock(id) {
  try {
    const data = await adminApi.put("/blockuser", id);
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function UserUnblock(id) {
  try {
    const data = await adminApi.put("/ublockUser", id);
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function VerifyNotification() {
  try {
    const data = await adminApi.get("/verify");
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function PropertyDetails(active, search) {
  try {
    const data = await adminApi.get(`/propertylistadmin/${active}/${search}`);
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function PropertyBlock(id) {
  try {
    const data = await adminApi.put("/propertyBlock", id);
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function PropertyUnblock(id) {
  try {
    const data = await adminApi.put("/propertyUnblock", id);
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function ViewPropertyDetails(id) {
  try {
    const data = await adminApi.get(`/viewDetails/${id}`);
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function AdminApprove(verify, id) {
  try {
    const data = await adminApi.put("/adminapprove", { verify, id });
    return data;
  } catch (err) {
    throw new err(err);
  }
}

 export async function DashboardData(){
  try{
    const data = await adminApi.get('/dashboard')
    return data
  }catch(err){
    throw new err(err);
  }
}

