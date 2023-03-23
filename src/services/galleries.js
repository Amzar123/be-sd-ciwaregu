const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const { v4: uuidv4 } = require('uuid');

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.json());

const galleries = [];

/* ----------------- POST ------------------- */
app.post('/v1/galleries', (req, res) => {
  // Extract the properties from the request body
  const { title, imageUrl, description } = req.body;

  // Generate ID
  // const id = 1;
  const id = uuidv4();

  // Create the new gallery object
  const newGallery = {
    id,
    title,
    imageUrl,
    description
  };

  galleries.push(newGallery);

  // sukses jika array books bertambah
  const isSuccess = galleries.filter((gallery) => gallery.id === id).length > 0;

  // jika sukses = true
  if (isSuccess) {
    
    return res.status(201).json({
      status: "success",
      message: 'Gallery created successfully',
      data:
      {
        galleryId: id 
      }
    });
  }

  // Return a success response to the client with the newly created gallery object
  return res.status(500).json({ status: 'Failed', message: 'Failed creating gallery'});
});

/* ----------------- GET ------------------- */
app.get('/v1/galleries', (req, res) => {
  // Check if there is a query parameter for filtering by title
  const { title } = req.query;

  // Filter galleries by title if the query parameter exists
  const filteredGalleries = title
    ? galleries.filter(gallery => gallery.title.includes(title))
    : galleries;

  // Map the galleries to the desired response format
  const mappedGalleries = filteredGalleries.map(gallery => ({
    id: gallery.id,
    title: gallery.title,
    imageUrl: gallery.imageUrl,
    description: gallery.description
  }));

  // Return the mapped galleries in the response
  return res.status(200).json({
    status: 'Success',
    data: {
      galleries: mappedGalleries
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});