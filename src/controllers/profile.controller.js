import ProfileService from "../services/profile.service.js";

//get all users function
const getById = async(req, res) => {
    try {
        res.json(await ProfileService.getProfileUser(req));
    } catch (error) {
        console.log(error);
    }
}

export default {
    getById,
}