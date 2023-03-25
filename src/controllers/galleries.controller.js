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
