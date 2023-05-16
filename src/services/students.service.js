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
            attributes: ['nis', 'jenisKel', 'tglMasuk']
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

export default {
    getMultipleStudents,
}