import ResponseClass from "../models/response.model.js"
import { Op } from 'sequelize';
import { Students } from "../models/students.model.js";
import { Users } from "../models/users.model.js";

async function getMultipleStudents(query) {
    
    const queryValue = query.value
    let whereClause = null;
    var responseSuccess = new ResponseClass.SuccessResponse
    var responseError = new ResponseClass.ErrorResponse

    try {
        if (!queryValue) {
            whereClause = {[Op.iLike]: `%%`}
        }else{
            whereClause = {[Op.iLike]: `%${queryValue}%`}
        }

        const dbResult = await Students.findAll({
            where: {
                [Op.or]: [
                    { nis: whereClause},
                    { '$studentsDetail.name$': whereClause },
                    { '$studentsDetail.email$': whereClause }
                ]
            },
            include: [
                { 
                    model: Users, 
                    as: 'studentsDetail',
                    attributes: ['name', 'email', 'imageUrl'],
                }
            ],
            attributes: ['id', 'nis', 'jenisKel', 'tglMasuk']
        })

        responseSuccess.message = "Get data students successfull!"
        responseSuccess.data = dbResult
        return responseSuccess
    } catch (error) {
        console.log(error)
        responseError.message = "Internal Server Error"
        responseError.code = 500
        return responseError
    }
}

async function getDetailsStudents(request) {

    const {studentId} = request.params
    var responseSuccess = new ResponseClass.SuccessResponse
    var responseError = new ResponseClass.ErrorResponse
    
    try {
        const dbResult = await Students.findOne({ 
            where: { id: studentId }, 
            include: [
                { 
                    model: Users, 
                    as: 'studentsDetail',
                    attributes: ['name', 'email', 'imageUrl'] 
                } 
            ],
        });

        responseSuccess.message = `Get details student ${dbResult.nis} successfull!`
        responseSuccess.data = dbResult
        return responseSuccess
    } catch (error) {
        console.log(error)
        responseError.message = "Internal Server Error"
        responseError.code = 500
        return responseError
    }
}

async function deleteStudentsById(request){
  
    const { studentId } = request.params
    var responseSuccess = new ResponseClass.SuccessWithNoDataResponse
    var responseError = new ResponseClass.ErrorResponse
  
    try {
  
        const dbResult = await Students.findOne({ where: { id: studentId } });
    
        const userResult = await Users.findOne({ where: { id: dbResult.userId } });
    
        if (!dbResult) {
            responseError.message = "Student not found in database"
            return responseError
        }

        const deletedNis = dbResult.nis
    
        // Delete the gallery by ID using the Galleries model
        await dbResult.destroy();
        await userResult.destroy();
    
        // Return success message in the response
        responseSuccess.message = `Delete Student with ${deletedNis} successfull!`
        return responseSuccess
      
    } catch (err) {
        console.error(err);
        responseError.message = "Internal Server Error"
        responseError.code = 500
        return responseError
    }
  }
  

export default {
    getMultipleStudents,
    getDetailsStudents,
    deleteStudentsById,
}