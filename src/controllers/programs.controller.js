import ProgramsService from "../services/programs.service.js"

const get = async (req, res) => {
    try {
        res.json(await ProgramsService.getPrograms())
    } catch (error) {
        console.log(error)
    }
}

const create = async(req, res, next) => {
    try {
        res.json(await ProgramsService.createPrograms(req.body));
    } catch (error) {
        console.log(error)
        next(error);
    }
}

const update = async(req, res, next) => {
    try {
        res.json(await ProgramsService.updateProgramsById(req))
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const deleteById = async(req, res, next) => {
    try {
        res.json(await ProgramsService.deleteProgramsById(req))
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const getById = async(req, res, next) => {
    try {
        res.json(await ProgramsService.getProgramById(req));
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export default{
    get,
    create,
    update,
    deleteById,
    getById
}