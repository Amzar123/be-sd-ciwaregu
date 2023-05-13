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

export default{
    get,
    create
}