import studentsService from "../services/students.service.js";

const get = async (req, res, next) => {
    try {
        res.json(await studentsService.getMultipleStudents(req.query));
    } catch (err) {
        console.error(`Error while getting students`, err.message);
        next(err);
    }
}

const getById = async(req, res, next) => {
    try {
        res.json(await studentsService.getDetailsStudents(req));
    } catch (err) {
        console.error(`Error while getting students`, err.message);
        next(err);
    }
}

const deleteByid = async(req, res, next) => {
    try {
        res.json(await studentsService.deleteStudentsById(req));
    } catch (err) {
        console.error(`Error while delete students`, err.message);
        next(err);
    }
}

const update = async(req, res, next) => {
    try {
        res.json(await studentsService.updateStudentsById(req));
    } catch (err) {
        console.error(`Error while delete students`, err.message);
        next(err);
    }
}

export default {
    get,
    getById,
    deleteByid,
    update
}