import ppdb from "../services/ppdb.service.js";

const create = async (req, res, next) => {
    try {
      // Create data to DB
      const data = await ppdb.registerPPDB(req);
      // if Return "Created / 201"
      if (data.code === 201)
      {
        // send response
        return res.status(201).json(data);
      }
      // return Error
      return res.status(400).json(data);
    } catch (err) {
      console.error(`Error while creating ppdb`, err.message);
      next(err);
    }
}

const get = async (req, res, next) => {
  try {
    res.json(await ppdb.getPPDB());
  } catch (err) {
      console.error(`Error while getting ppdb`, err.message);
      next(err);
  }
}

const update = async (req, res, next) => {
  try {
    // Create data to DB
    const data = await ppdb.updateVerifyPPDB(req);
    // if Return "Created / 201"
    // send response
      return res.status(200).json(data);
    // return Error
  } catch (err) {
    console.error(`Error while updating teacher`, err.message);
    next(err);
  }
}

export default{
    create,
    get,
    update
}