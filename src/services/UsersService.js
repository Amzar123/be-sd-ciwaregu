import bcrypt from "bcrypt";
import Users from "../models/UserModel.js";
import ResponseClass from "../models/Response.js";

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

    if (requestBody.password !== requestBody.confirmPassword) {

        responseError.status = "Failed";
        responseError.code = 400;
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

            responseSuccess.status = "Success";
            responseSuccess.code = 200;
            responseSuccess.message = "Register Sucess"
            responseSuccess.data = {
                name: requestBody.name,
                email: requestBody.email,
                password: requestBody.password
            }
            return responseSuccess

        } catch (error){
            console.log(error)
            
            responseError.status = "Failed";
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