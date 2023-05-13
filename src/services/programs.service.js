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

//update programs by ID
async function updateProgramsById(request){
    var responseError = new ResponseClass.ErrorResponse()
    var responseSuccess = new ResponseClass.SuccessWithNoDataResponse()

    const programId = request.params.programId
    const {name, goal} = request.body

    if (!name || !goal) {
        responseError.message = "Name or Goal cannot be empty"
        return responseError
    }else{
        try {
            const existingPrograms = await Programs.findOne({ where: { id: programId } })
            
            if (!existingPrograms) {
                responseError.message = "Programs Not Found"
                return responseError
            }
            
            await existingPrograms.update({
                name: name,
                goal: goal,
                updatedAt: new Date()
            });

            responseSuccess.message = `update programs ${name} successfully`;
            return responseSuccess

        } catch (error) {
            responseError.code = 500
            responseError.message = error
            return responseError;
        }
    }
}

//delete programs by id
async function deleteProgramsById(request) {
    var responseError = new ResponseClass.ErrorResponse()
    var responseSuccess = new ResponseClass.SuccessWithNoDataResponse()

    const programId  = request.params.programId
    
    try {
        //find by id in DB
        const programResult = await Programs.findOne({ where: {id: programId} })

        if (!programResult) {
            responseError.message = "Programs Not Found!"
            return responseError
        }
        
        //delete row
        await programResult.destroy();

        responseSuccess.message = "Delete programs successfully!"
        return responseSuccess

    } catch (error) {
        console.error(error)
        responseError.code = 500
        responseError.message = error
        return responseError
    }
}

export default{
    getPrograms,
    createPrograms,
    updateProgramsById,
    deleteProgramsById,
}