import UsersService from "../services/users.service.js";
import ResponseClass from "../models/response.model.js";
import { request } from "express";

//get all users function
const get = async(req, res) => {
    try {
        const users = await UsersService.getPpdb();
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

//register function
const register = async(req, res) =>  {
    try {
        res.json(await UsersService.registerUsers(req.body));
    }catch(error){
        console.log(error);
    }
}

//login function
const login = async(req, res) => {
    try {
        var loginResult = await UsersService.loginUsers(req.body);

        //if login result is success
        if (loginResult.code == 200) {
            var responseSuccess = new ResponseClass.SuccessResponse()

            //return response cookie with refresh_token
            res.cookie('refreshToken', loginResult.refresh_token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            
            //return response
            responseSuccess.message = "Login Success"
            responseSuccess.data = {
                userId: loginResult.userId,
                email: req.body.email,
                role: loginResult.role,
                authentication_token: loginResult.accessToken
            }
    
            res.json(responseSuccess);
        }else{
            //return error response
            res.json(loginResult);
        }
        
    } catch (error) {
        console.log(error);
    }
}

const logout = async(req, res, next) => {
    try {
        var logoutResult = await UsersService.logoutUsers(req.headers.cookie);

        if (logoutResult.code == 200) {
            res.clearCookie('refreshToken')
        }

        res.json(logoutResult)
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export default {
    get,
    login,
    register,
    logout
}