import ResponseClass from "../models/response.model.js"
import { Programs } from "../models/programs.model.js"

//get all programs
async function getPrograms(){
    try {
        var responseError = new ResponseClass.ErrorResponse()
        var responseSuccess = new ResponseClass.SuccessResponse()

        const programsResult = await Programs.findAll({
            attributes: ['id', 'name', 'goal']
        })

        responseSuccess.message = "get all programs success"
        responseSuccess.data = programsResult
        
        return responseSuccess
    } catch (error) {
        responseError.code = 500;
        responseError.message = error
        return responseError
    }
}

export default{
    getPrograms
}