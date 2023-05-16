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
        return responseError
    }
}

export default {
    getMultipleStudents,
    getDetailsStudents,
}