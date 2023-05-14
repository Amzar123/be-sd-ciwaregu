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
      console.error(`Error while creating gallery`, err.message);
      next(err);
    }
}

export default{
    create
}