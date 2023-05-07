import UsersService from "../services/UsersService.js";
import ResponseClass from "../models/Response.js";

//get all users function
export const get = async(req, res) => {
    try {
        const users = await UsersService.getUsers();
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

//register function
export const register = async(req, res) =>  {
    try {
        res.json(await UsersService.registerUsers(req.body));
    }catch(error){
        console.log(error);
    }
}

//login function
export const login = async(req, res) => {
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
                object: "authentication_token",
                email: req.body.email,
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