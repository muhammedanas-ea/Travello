import bcrypt from 'bcrypt'


// PASSSWORD HASHING SECTION 

export const securePassword = async (password) =>{
    try{
        let passwordHash = await bcrypt.hash(password,10);
        return passwordHash
    }catch(err){
        console.log(err)
    }
}