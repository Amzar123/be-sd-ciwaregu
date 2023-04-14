import UsersService from "../services/UsersService.js";

export const get= async(req, res) => {
    try {
        const users = await UsersService.getUsers();
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const create = async(req, res) =>  {
    try {
        res.json(await UsersService.registerUsers(req.body));
    }catch(error){
        console.log(error);
    }
}