import studentsService from "../services/students.service.js";

const get = async (req, res, next) => {
    try {
        res.json(await studentsService.getMultipleStudents(req.query));
    } catch (err) {
        console.error(`Error while getting students`, err.message);
        next(err);
    }
}

export default {
    get,
}