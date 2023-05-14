import ResponseClass from "../models/response.model.js"
import { Programs } from "../models/programs.model.js"
import { Teachers } from "../models/teachers.model.js"
import { Students } from "../models/students.model.js"
import { Awards } from "../models/awards.model.js"

async function getStats(){
    var responseError = new ResponseClass.ErrorResponse()
    var responseSuccess = new ResponseClass.SuccessResponse()
    try {
        const countResult = {
            teacherCount: await Teachers.count(),
            studentCount: await Students.count(),
            programCount: await Programs.count(),
            awardCount: await Awards.count()
        }
        
        responseSuccess.message = "get Stats success"
        responseSuccess.data = countResult
        
        return responseSuccess
    } catch (error) {
        responseError.code = 500;
        responseError.message = error
        return responseError
    }
}

export default {
    getStats
}