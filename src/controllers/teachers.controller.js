import teachers from "../services/teachers.service.js";

const get = async (req, res, next) => {
  try {
    res.json(await teachers.getMultiple(req.query));
  } catch (err) {
      console.error(`Error while getting programming languages`, err.message);
      next(err);
  }
}



export default {
  get
}