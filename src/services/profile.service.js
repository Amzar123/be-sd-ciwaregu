import ResponseClass from "../models/response.model.js";
import { Users } from "../models/users.model.js";

async function getProfileUser(request) {
    var responseError = new ResponseClass.ErrorResponse()
    var responseSuccess = new ResponseClass.SuccessResponse()

    const userId = request.params.userId

    try {
        //find by id in DB
        const userResult = await Users.findOne({ 
            where: {id: userId},
            attributes: ['id', 'name', 'email', 'address', 'birthDate', 'imageUrl']
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

export default {
    getProfileUser,
}