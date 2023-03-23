const galleries = require('../services/galleries.service');

async function get(req, res, next) {
  // try {
  //     res.json(await galleries.getMultiple(req.query.page));
  // } catch (err) {
  //     console.error(`Error while getting programming languages`, err.message);
  //     next(err);
  // }
}

async function create(req, res, next) {
  try {
    const gallery = await galleries.create(req.body);

    if (gallery.status === true)
    {
      return res.status(201).json({ 
        status: "success",
        code: 201,
        message: 'Gallery created successfully',
        data:
        {
          galleryId: gallery.newGallery.id,
          title: gallery.newGallery.title,
          imageUrl: gallery.newGallery.imageUrl,
          description: gallery.newGallery.description
        }
      });
    }

    return res.status(500).json({ status: 'Failed', message: 'Failed creating gallery'});

  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
}


module.exports = {
  get,
  create
};
