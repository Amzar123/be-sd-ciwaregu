const galleries = require('../services/galleries.service');

async function get(req, res, next) {
  try {
    return res.json(await galleries.getMultiple(req.query));
  } catch (err) {
      console.error(`Error while getting programming languages`, err.message);
      next(err);
  }
}

async function create(req, res, next) {
  try {
    const data = await galleries.create(req.body);
    if (data.code === 201)
    {
      return res.status(201).json(data);
    }
    return res.status(400).json(data);
  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
}


module.exports = {
  get,
  create
};
