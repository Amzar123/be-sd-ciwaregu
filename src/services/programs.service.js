import ResponseClass from "../models/response.model.js"
import { Programs } from "../models/programs.model.js"
import { v4 as uuidv4 } from 'uuid';

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

//post new programs to DB
async function createPrograms(requestBody){
    var responseError = new ResponseClass.ErrorResponse()
    var responseSuccess = new ResponseClass.SuccessWithNoDataResponse()

    console.log(requestBody.name)

    if (!requestBody.name || !requestBody.goal) {
        responseError.message = "Name or Goal cannot be empty"
        return responseError
    }else{
        try {
            await Programs.create({
                id: uuidv4(),
                name: requestBody.name,
                goal: requestBody.goal,
            });

            responseSuccess.message = "Create new programs successfully";
            return responseSuccess

        } catch (error) {
            responseError.code = 500
            responseError.message = error
            return responseError;
        }
    }
}

export default{
    getPrograms,
    createPrograms
}