const pool = require("../configs/db.config")
const { v4: uuidv4 } = require('uuid');

async function getMultiple(query){
  
  const { title, imageUrl, Description } = query;

  try {
    const { rows } = await pool.query('SELECT * FROM galleries');

    // Filter galleries by title if the query parameter exists
    const filteredGalleries = title
    ? rows.filter(gallery => gallery.title.includes(title))
    : rows;

    // Map the galleries to the desired response format
    const galleries = filteredGalleries.map(gallery => ({
      id: gallery.id,
      title: gallery.title,
      imageUrl: gallery.imageurl,
      description: gallery.description,
      createdAt: gallery.createdat,
      updatedAt: gallery.updatedat
    }));

    // Return the mapped galleries in the response
    return {
      status: "success", 
      code : 200,
      message : 'Fetching galleries successfully!',
      data : galleries
    }
    
  } catch (err) {
    console.error(err);
    return {
      status: "Failed", 
      code : 400,
      message : 'Error fetching galleries!'
    }
  }
}

async function create(gallery){

  try {
    const { title, imageUrl, description } = gallery

    // Error message
    if (!title || !imageUrl || !description) {
      let message = ""
      
      if (!title ) {
        message += ", title"
      }
      
      if (!imageUrl) {

        message += ", imageUrl"
      }

      if (!description) {
        message += ", description"
      }
    
      return { 
        status: 'Failed',
        code: 400,
        message: `Failed creating gallery${message} is empty!`
      }
    }
    
    // Generate ID, timestamp
    const id = uuidv4()
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt
    
    await pool.query(
      'INSERT INTO galleries (id, title, imageurl, description, createdat, updatedat) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
      [id, title, imageUrl, description, createdAt, updatedAt]
    );


    // Return the mapped galleries in the response
    return {
      status: "success",
      code : 201,
      message : 'Gallery created successfully!',
      data : { 
        galleryId: id,
        title: title,
        imageUrl: imageUrl,
        description: description
      }
    }
    
  } catch (err) {
    console.error(err);
    return {
      status: "Failed", 
      code : 400,
      message : 'Error creating gallery!'
    }
  }
}

module.exports = {
  getMultiple,
  create
}
