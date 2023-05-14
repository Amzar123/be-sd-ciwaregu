import ProfileService from "../services/profile.service.js";

//get all users function
const getById = async(req, res) => {
    try {
        res.json(await ProfileService.getProfileUser(req));
    } catch (error) {
        console.log(error);
    }
}

const update = async(req, res) => {
    try {
        res.json(await ProfileService.updateProfile(req));
    } catch (error) {
        console.log(error);
    }
}

export default {
    getById,
    update,
}