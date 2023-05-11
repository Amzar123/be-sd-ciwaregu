import StatsService from "../services/stats.service.js"

const get = async (req, res) => {
    try {
        res.json(await StatsService.getStats())
    } catch (error) {
        console.log(error)
    }
}

export default{
    get
}