const galleries = require('../services/galleries.service');

async function get(req, res, next) {
  try {
    res.json(await galleries.getMultiple(req.query));
  } catch (err) {
      console.error(`Error while getting programming languages`, err.message);
      next(err);
  }
}


module.exports = {
  get
};

import galleries from "../services/galleries.service.js";

export const create = async (req, res, next) => {
  try {
    // Create data to DB
    const data = await galleries.createGalleries(req.body);
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