import ResponseClass from "../models/response.model.js";
import bcrypt from "bcrypt";
import { Users } from "../models/users.model.js";
import { validatePassword } from "../models/password.model.js";

async function getProfileUser(request) {
    var responseError = new ResponseClass.ErrorResponse()
    var responseSuccess = new ResponseClass.SuccessResponse()

    const userId = request.params.userId

    try {
        //find by id in DB
        const userResult = await Users.findOne({ 
            where: {id: userId},
            attributes: ['id', 'name', 'email', 'address', 'tanggalLahir', 'imageUrl']
        })

        if (!userResult) {
            responseError.message = "User Not Found!"
            return responseError
        }
        
        responseSuccess.message = `get User - ${userResult.name} success!`
        responseSuccess.data = userResult
        return responseSuccess

    } catch (error) {
        console.error(error)
        responseError.code = 500
        responseError.message = error
        return responseError
    }
}

async function updateProfile(request) {
    var responseError = new ResponseClass.ErrorResponse()
    var responseSuccess = new ResponseClass.SuccessWithNoDataResponse()

    const {name, email, address, password, confirmPass, birthDate, imageUrl} = request.body
    const userId = request.params.userId

    if (!name || !email) {
        responseError.message = "name or email cannot be null!"
        return responseError
    }

    //regex for email format
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if(emailRegexp.test(email) == false){

        responseError.message = "Email is invalid"
        return responseError

    }

    //SELECT ... where email = requestbody.email LIMIT 1
    const userRegistered = await Users.findOne({
        where: { email: email}
    })

    if (userRegistered !== null && email !== userRegistered.email) {
        responseError.message = "Email has been registered"
        return responseError
    }

    //jika ada pergantian password
    if (password != null) {
        //validate method from users model
        const passValidation = validatePassword(password, false)
        if(passValidation == false){

            responseError.message = validatePassword(password, true)
            return responseError
    
        }else{
            if (password !== confirmPass) {

                responseError.message = "Password and Confirm Password not match"
                return responseError

            }else{
                const salt = await bcrypt.genSalt();
                const newHashPass = await bcrypt.hash(password, salt);

                const matchPassword = await bcrypt.compare(password, userRegistered.password);
                if (matchPassword) {
                    responseError.message = "New Password is Same with old password!"
                    return responseError
                }

                try {

                    //update user to database
                    await Users.update(
                        {name: name,
                        email: email,
                        password: newHashPass,
                        imageUrl: imageUrl,
                        address: address,
                        birthDate: birthDate},
                        { where: { id: userId}}
                    );
                    
                    //return response success
                    responseSuccess.message = `Update data with id: ${userId} Sucess`
                    return responseSuccess
        
                } catch (error){
                    console.log(error)
                    
                    //return server error response
                    responseError.code = 500;
                    responseError.message = error
                    
                    return responseError
                };
            };
        }
    }else{
        try {

            //update user to database
            await Users.update(
                {name: name,
                email: email,
                imageUrl: imageUrl,
                address: address,
                birthDate: birthDate},
                { where: { id: userId }}
            );
            
            //return response success
            responseSuccess.message = `Update data with id: ${userId} Sucess`
            return responseSuccess

        } catch (error){
            console.log(error)
            
            //return server error response
            responseError.code = 500;
            responseError.message = error
            
            return responseError
        };
    }
}

export default {
    getProfileUser,
    updateProfile,
}