import axiosInterceptorInstance from "../utils/UserMiddleware";

const userApi = axiosInterceptorInstance;

export async function UserSignUp(signupData) {
  try {
    const data = await userApi.post("/signup", signupData);
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function EmailVerify(id, token) {
  try {
    const data = await userApi.get(`verify/${id}/${token}`);
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function UserLogin(loginData) {
  try {
    const data = await userApi.post("/login", loginData);
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function UserGoogleSignUp(googleData) {
  try {
    const data = await userApi.post("/googleSignUp", googleData);
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function UserGoogleSignin(googleSigninData) {
  try {
    const data = await userApi.post("/googleSignin", googleSigninData);
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function UserForgotPassword(email) {
  try {
    const data = await userApi.post("/forgotPassword", email);
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function UserRestPassword(resetPasswordData) {
  try {
    const data = await userApi.post("/restPasword", resetPasswordData);
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function UserPropertyList(active,sort,aminitesSort,search,priceFilter) {
  try {
    console.log(active);
    const serializedArray = encodeURIComponent(JSON.stringify(aminitesSort));
    const data = await userApi.get(
      `/userpropertylist/${active}/${sort}/${serializedArray}/${search}/${priceFilter}`
    );
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function PropertySwiperData(){
  return await userApi.get('/propertyswiper')
}

export async function UpdateProfile(profileData, id) {
  try {
    const data = await userApi.put("/userprofile", { profileData, id });
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function UserProfileData(id) {
  try {
    const data = await userApi.get(`/profileData/${id}`);
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function UserSingleProperty(id) {
  try {
    const data = await userApi.get(`/singleproperty/${id}`);
    return data;
  } catch (err) {
    throw new err(err);
  }
}

export async function BookingDetails(bookingData){
  try{
    
    const data = await userApi.post('/bookings',bookingData)
    return data
  }catch(err){
    throw new err(err)
  }
}

export async function PaymentDetails(bookingId){
  try{
    const data = await userApi.get(`/paymentdetails/${bookingId}`)
    return data
  }catch(err){
    throw new err(err)
  }
}


export async function BoookingSummery(id,active){
  try{
    const data = await userApi.get(`/bookingsummery/${id}/${active}`)
    return data
  }catch(err){
    throw new err(err)
  }
}

export async function BookingCancelUser(bookingId) {
  try {
    const data = await userApi.post('/bookingcancel', { bookingId });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}


export async function MangeWalletPayment(bookingId){
  try{
    const data = await userApi.post('/walletpayment',{bookingId})
    return data
  }catch (err) {
    throw new Error(err);
  }
}

export async function BoookigCompletedDetails(bookingId){
  try{
    const data = await userApi.get(`/bookingcompleted/${bookingId}`)
    return data
  }catch(err){
    throw new Error(err)
  }
}

export async function AllChats(userId){
  try{
    const data = await userApi.get(`/fetchchat/${userId}`)
    return data
  }catch(err){
    throw new Error(err)
  }
}

export async function UserChatSearch(search){
  try{
    const data = await userApi.get(`/usersearch/${search}`)
    return data
  }catch(err){
    throw new Error(err)
  }
}


export async function MessageSend(content,chatId,userId){
  try{
    console.log(chatId,'in api is working')
    const data = await userApi.post('/message',{content,chatId,userId})
    return data
  }catch(err){
    throw new Error(err)
  }
}
export async function AddReview(value,propertyId){
  try{
    const data = await userApi.post('/addreview',value,propertyId)
    return data
  }catch(err){
    throw new Error(err)
  }
}

