import galleries from "../services/galleries.service.js";

const get = async (req, res, next) => {
  try {
    res.json(await galleries.getMultiple(req.query));
  } catch (err) {
      console.error(`Error while getting programming languages`, err.message);
      next(err);
  }
}


const create = async (req, res, next) => {
  try {
    // Create data to DB
    const data = await galleries.createGalleries(req);
    // if Return "Created / 201"
    if (data.code === 201)
    {
      // send response
      return res.status(201).json(data);
    }
    // return Error
    return res.status(400).json(data);
  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
}

const update = async (req, res, next) => {
  try {
    // Create data to DB
    const data = await galleries.updateGalleriesById(req);
    // if Return "Created / 201"
    if (data.code === 200)
    {
      // send response
      return res.status(200).json(data);
    }
    // return Error
    return res.status(400).json(data);
  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
}

export default {
  get,
  create,
  update
}