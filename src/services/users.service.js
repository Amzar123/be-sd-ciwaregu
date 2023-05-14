import bcrypt from "bcrypt";
import ResponseClass from "../models/response.model.js";
import { validatePassword } from "../models/password.model.js";
import { Users } from "../models/users.model.js";
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
            const emailRegistered = await Users.findOne({
                where: { email: requestBody.email}
            })

            if (emailRegistered !== null) {
        
                responseError.message = "Email has been registered"
                return responseError

            }else{
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
                            //add user to database
                            await Users.create({
                                id: uuidv4(),
                                name: requestBody.name,
                                email: requestBody.email,
                                password: hashPass,
                                role: "Users"
                            });
                            
                            //return response success
                            responseSuccess.message = "Register Sucess"
                            responseSuccess.data = {
                                name: requestBody.name,
                                email: requestBody.email,
                                password: requestBody.password,
                                role: "Users"
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
        const userRegistered = await Users.findOne({
            where: { email: requestbody.email}
        })

        if (!userRegistered) {
            responseError.message = "Email not found!"
            return responseError
        }else{

            const matchPassword = await bcrypt.compare(requestbody.password, userRegistered.password);
            if (!matchPassword) {
                responseError.message = "Wrong Password!"
                return responseError
            }else{
                const resultToken = generateToken(userRegistered)

                try {
                    //update refresh token to database
                    await Users.update({refresh_token: resultToken.refreshToken},{
                        where:{
                            id: userRegistered.id
                        }
                    })
                    
                    //return login result response
                    const loginResult = {
                        code: 200,
                        userId: userRegistered.id,
                        role: userRegistered.role,
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

async function logoutUsers(request) {
    var responseError = new ResponseClass.ErrorResponse()
    var responseSuccess = new ResponseClass.SuccessWithNoDataResponse()
    
    if (!request) {
        responseSuccess.code = 204
        responseSuccess.message = "The Request did not return any content"
        return responseSuccess
    }

    try {
        const requestCookie = request.split("=");
        const refreshToken = requestCookie[1]

        const loginUsers = await Users.findOne({ where: { refresh_token: refreshToken } });
    
        if (loginUsers !== null) {
          await Users.update({ refresh_token: null }, { where: { id: loginUsers.id } });
        } else {
          responseSuccess.code = 204;
          responseSuccess.message = "The Request did not return any content";
          return responseSuccess;
        }
    
        responseSuccess.code = 200;
        responseSuccess.message = "You've Been Logged Out";
        return responseSuccess;
    } catch (error) {
        console.log(error);
        responseError.code = 500;
        responseError.message = "Internal Server Error";
        return responseError;
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
    loginUsers,
    logoutUsers
};