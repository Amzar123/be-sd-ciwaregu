import bcrypt from "bcrypt";
import ResponseClass from "../models/response.model.js";
import { validatePassword } from "../models/password.model.js";
import { Students } from "../models/students.model.js";
import { Teachers } from "../models/teachers.model.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

//get all users function
async function getPpdb(){
    try {
        return "Halaman PPDB"
    } catch (error) {
        return error
    }
}

//registerUser function
async function registerUsers(requestBody){
    var responseError = new ResponseClass.ErrorResponse()
    var responseSuccess = new ResponseClass.SuccessResponse()
    
    //check if password or email is empty
    if(!requestBody.email || !requestBody.password){
        
        responseError.message = "Email or Password missing"
        return responseError
        
    }else{

        //regex for email format
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if(emailRegexp.test(requestBody.email) == false){

            responseError.message = "Email is invalid"
            return responseError
    
        }else{
            //SELECT ... where email = requestbody.email LIMIT 1
            const emailStudentsRegistered = await Students.findOne({
                where: { email: requestBody.email}
            })

            const emailTeachersRegistered = await Teachers.findOne({
                where: { email: requestBody.email}
            })

            if (emailStudentsRegistered == null && emailTeachersRegistered == null) {                

                //validate method from users model
                const passValidation = validatePassword(requestBody.password, false)
                if(passValidation == false){

                    responseError.message = validatePassword(requestBody.password, true)
                    return responseError
            
                }else{
                    if (requestBody.password !== requestBody.confirmPassword) {
    
                        responseError.message = "Password and Confirm Password not match"
                        return responseError

                    }else{
                        const salt = await bcrypt.genSalt();
                        const hashPass = await bcrypt.hash(requestBody.password, salt);
                        try {
                            //add student to tabels Students
                            await Students.create({
                                id: uuidv4(),
                                name: requestBody.name,
                                email: requestBody.email,
                                password: hashPass,
                            });
                            
                            //return response success
                            responseSuccess.message = "Register Success"
                            responseSuccess.data = {
                                name: requestBody.name,
                                email: requestBody.email,
                                password: requestBody.password
                            }
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
                responseError.message = "Email has been registered"
                return responseError
            }
        }
    }
}

//login users function
async function loginUsers(requestbody){
    var responseError = new ResponseClass.ErrorResponse()

    //check if email and password is empty
    if (!requestbody.email || !requestbody.password) {
        responseError.message = "Email or Password missing"
        return responseError
    }else{
        //find email from request body in database
        const userStudentsRegistered = await Students.findOne({
            where: { email: requestbody.email}
        })

        const userTeachersRegistered = await Teachers.findOne({
            where: { email: requestbody.email}
        })

        if (userStudentsRegistered == null && userTeachersRegistered == null) {
            responseError.message = "Email not found!"
            return responseError
        }else{
            //compare request body password with password in database
            if (userStudentsRegistered !== null) {
                const matchPassword = await bcrypt.compare(requestbody.password, userStudentsRegistered.password);
                //if pass not match
                if (!matchPassword) {
                    responseError.message = "Wrong Password!"
                    return responseError
                }else{
                    const resultToken = generateToken(userStudentsRegistered)
    
                    try {
                        //update refresh token to database
                        await Students.update({refresh_token: resultToken.refreshToken},{
                            where:{
                                id: userStudentsRegistered.id
                            }
                        })
                        
                        //return login result response
                        const loginResult = {
                            code: 200,
                            userId: userStudentsRegistered.id,
                            roles: "Student",
                            refresh_token: resultToken.refreshToken,
                            accessToken: resultToken.accessToken,
                        }
            
                        return loginResult
                    } catch (error) {
                        console.log(error);
    
                        responseError.code = 500;
                        responseError.message = error
                        
                        return responseError
                    }
                }
            }else {
                const matchPassword = await bcrypt.compare(requestbody.password, userTeachersRegistered.password);
                //if pass not match
                if (!matchPassword) {
                    responseError.message = "Wrong Password!"
                    return responseError
                }else{
                    const resultToken = generateToken(userTeachersRegistered)
    
                    try {
                        //update refresh token to database
                        await Teachers.update({refresh_token: resultToken.refreshToken},{
                            where:{
                                id: userTeachersRegistered.id
                            }
                        })
                        
                        //return login result response
                        const loginResult = {
                            code: 200,
                            userId: userTeachersRegistered.id,
                            roles: "Teachers",
                            refresh_token: resultToken.refreshToken,
                            accessToken: resultToken.accessToken,
                        }
            
                        return loginResult
                    } catch (error) {
                        console.log(error);
    
                        responseError.code = 500;
                        responseError.message = error
                        
                        return responseError
                    }
                }
            }          
        }
    }
}

function generateToken(userRegistered) {
    const userId = userRegistered.id;
    const name = userRegistered.name;
    const email = userRegistered.email;
    //create access token for authorization using jwt
    const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '120s'
    })

    //create refresh token using jwt
    const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1d'
    })

    const token = {
        refreshToken: refreshToken,
        accessToken: accessToken
    }

    return token
}


export default {
    getPpdb,
    registerUsers,
    loginUsers
};