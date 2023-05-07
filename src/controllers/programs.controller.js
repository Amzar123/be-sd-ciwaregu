import ProgramsService from "../services/programs.service.js"

const get = async (req, res) => {
    try {
        res.json(await ProgramsService.getPrograms())
    } catch (error) {
        console.log(error)
    }
}

export default{
    get
}