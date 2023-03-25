const pool = require("../configs/db.config")
const { v4: uuidv4 } = require('uuid');

async function create(gallery){

  try {
    // Get request Body
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
    
    // INSERT into galleries
    await pool.query(
      'INSERT INTO galleries (id, title, imageurl, description, createdat, updatedat) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
      [id, title, imageUrl, description, createdAt, updatedAt]
    );


    // Return the galleries in the response
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
  create
}
