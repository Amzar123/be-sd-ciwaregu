import teachers from "../services/teachers.service.js";

const get = async (req, res, next) => {
  try {
    res.json(await teachers.getMultiple(req.query));
  } catch (err) {
      console.error(`Error while getting teachers`, err.message);
      next(err);
  }
}

const create = async (req, res, next) => {
  try {
    // Create data to DB
    const data = await teachers.createTeacher(req.body);
    // if Return "Created / 201"
    if (data.code === 201)
    {
      // send response
      return res.status(201).json(data);
    }
    // return Error
    return res.status(400).json(data);
  } catch (err) {
    console.error(`Error while creating teacher`, err.message);
    next(err);
  }
}

export default {
  get,
  create
}