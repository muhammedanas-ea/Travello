import axiosInterceptorInstanceOwner from "../utils/PropertyOwnerMiddleware";

const propertyApi = axiosInterceptorInstanceOwner;

export async function PropertySignUp(signupData) {
  try {
    const data = await propertyApi.post("/propertySignup", signupData);
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function OtpChecking(otpData) {
  try {
    const data = await propertyApi.post("/otpChecking", otpData);
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function PropertySignin(loginData) {
  try {
    const data = await propertyApi.post("/propertySignin", loginData);
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function AddProperty(addData) {
  try {
    console.log(addData,'aaaaaaaaa');
    const config = {
      header: {
        "content-type": "multipart/form-data",
      },
      WithCreadentials: true,
    };
    const data = await propertyApi.post("/addProperty", addData, config);
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function ListProperty(id) {
  try {
    const data = await propertyApi.get(`/listProperty/${id}`);
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function SinglePropertyDetails(id){
  try{
    const data = await propertyApi.get(`/propertydetails/${id}`)
    return data 
  }catch(err){
    throw new err(err);
  }
}

export async function BookingDetailsOwner(id,active){
  try{
    const data = await propertyApi.get(`/bookingdetails/${id}/${active}`)
    return data
  }catch(err){
    throw new err(err);
  }
}


export async function EditProperty(editData){
  try{
    const data = await propertyApi.post("/editProperty",editData);
    return data;
  }catch(err){
    throw new err(err);
  }
}


export async function OwnerMessageSend(content,chatId,userId){
  try{
    const data = await propertyApi.post('/message',{content,chatId,userId})
    return data
  }catch(err){
    throw new Error(err)
  }
}

export async function OwnerChatSearch(search){
  try{
    const data = await propertyApi.get(`/ownersearch/${search}`)
    return data
  }catch(err){
    throw new Error(err)
  }
}


export async function AllChats(userId){
  try{
    const data = await propertyApi.get(`/fetchchat/${userId}`)
    return data
  }catch(err){
    throw new Error(err)
  }
}

export async function DashboardData(proprtyId){
  try{
    const data = await propertyApi.get(`/dashboard/${proprtyId}`)
    return data
  }catch(err){
    throw new Error(err)
  }
}

export async function PropertyHide(propertyId,hide){
  try{
    const data = await propertyApi.put('/hideproperty',{propertyId,hide})
    return data
  }catch(err){
    throw new Error(err)
  }
}