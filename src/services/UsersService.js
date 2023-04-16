import bcrypt from "bcrypt";
import ResponseClass from "../models/Response.js";
import { Users, validatePassword } from "../models/UserModel.js";

async function getUsers(){
    try {
        const dbResult = await Users.findAll()
        return dbResult
    } catch (error) {
        return error
    }
}

async function registerUsers(requestBody){
    var responseError = new ResponseClass.ErrorResponse()
    var responseSuccess = new ResponseClass.SuccessResponse()

    //SELECT ... where email = requesbody.email LIMIT 1
    const emailRegistered = await Users.findOne({
        where: { email: requestBody.email}
    })

    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const passValidation = validatePassword(requestBody.email, false)
    
    if (emailRegistered !== null) {
        
        responseError.message = "Email has been registered"
        return responseError
        
    }else if(emailRegexp.test(requestBody.email) == false){

        responseError.message = "Email is invalid"
        return responseError

    }else if(!requestBody.email || !requestBody.password){
        
        responseError.message = "Email or Password missing"
        return responseError

    }else if(passValidation == false){

        responseError.message = validatePassword(requestBody.email, true)
        return responseError

    }else if (requestBody.password !== requestBody.confirmPassword) {

        responseError.message = "Password and Confirm Password not match"
        return responseError

    }else{
        const salt = await bcrypt.genSalt();
        const hashPass = await bcrypt.hash(requestBody.password, salt);
        try {
            await Users.create({
                name: requestBody.name,
                email: requestBody.email,
                password: hashPass,
                address: requestBody.address,
                birthDate: requestBody.birthDate,
            });

            responseSuccess.message = "Register Sucess"
            responseSuccess.data = {
                name: requestBody.name,
                email: requestBody.email,
                password: requestBody.password
            }
            return responseSuccess

        } catch (error){
            console.log(error)
            
            responseError.code = 500;
            responseError.message = error
            
            return responseError
        };
    };
}

export default {
    getUsers,
    registerUsers
};