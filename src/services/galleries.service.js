// import { query } from "../configs/db.config.js";
import { v4 as uuidv4 } from 'uuid';
import { Galleries } from "../models/galleries.model.js";

async function createGalleries(responseBody){

  // Get request Body
  const { title, imageUrl, description } = responseBody
  
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
    
    try {

      // Create new gallery record using the Galleries model
      const newGallery = await Galleries.create({
        id: uuidv4(),
        title: title,
        imageUrl: imageUrl,
        description: description,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Return the newly created gallery in the response
      return {
        status: "success",
        code: 201,
        message: 'Gallery created successfully!',
        data: {
          galleryId: newGallery.id,
          title: newGallery.title,
          imageUrl: newGallery.imageUrl,
          description: newGallery.description
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

export default {
  createGalleries
}
