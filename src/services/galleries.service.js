import { Op } from 'sequelize';
// import { query } from "../configs/db.config.js";
import { v4 as uuidv4 } from 'uuid';
import { Galleries } from "../models/galleries.model.js";

async function getMultiple(query){
  
  const { title, imageUrl, description } = query;

  try {

    const whereClause = {};

    if (title) {
      whereClause.title = {
        [Op.iLike]: `%${title}%`, // use case-insensitive LIKE operator
      };
    }
    if (imageUrl) {
      whereClause.imageUrl = imageUrl;
    }
    if (description) {
      whereClause.description = {
        [Op.iLike]: `%${description}%`, // use case-insensitive LIKE operator
      };
    }

    const dbResult = await Galleries.findAll({ where: whereClause });

    // Return the mapped galleries in the response
    return {
      status: "success", 
      code : 200,
      message : 'Fetching galleries successfully!',
      data : dbResult
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

async function createGalleries(request){

  // Get request Body
  const { title, description } = request.body

  // const imageUrl = request.file.path
  
  // Error message
  if (!title || !description) {
    let message = ""
    
      if (!title ) {
        message += ", title"
      }
      
      // if (!imageUrl) {

      //   message += ", imageUrl"
      // }

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
      
      let imageUrl = null

      if (request.file) {
        imageUrl = request.file.path
      }

    // set default imageUrl if empty
    const defaultImageUrl = 'https://res.cloudinary.com/dp7yp5kgv/image/upload/v1684334844/galleries/map_uqx7qx.jpg';
    const finalImageUrl = imageUrl || defaultImageUrl;
      
      // Create new gallery record using the Galleries model
      const newGallery = await Galleries.create({
        id: uuidv4(),
        title: title,
        imageUrl: finalImageUrl,
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

async function updateGalleriesById(request){

  const { galleryId } = request.params


  // Get request Body
  const { title, description } = request.body
  
  // Error message
  if (!title  || !description) {
    let message = ""
    
      if (!title ) {
        message += ", title"
      }
      
      /* if (!imageUrl) {

        message += ", imageUrl"
      } */

      if (!description) {
        message += ", description"
      }
    
      return { 
        status: 'Failed',
        code: 400,
        message: `Failed updating gallery${message} is empty!`
      }
    }
    
    try {

      // Find the existing gallery by its id using the Galleries model
      const existingGallery = await Galleries.findByPk(galleryId);

      // Update the existing gallery record
      const updatedGallery = await existingGallery.update({
        title: title,
        description: description,
        updatedAt: new Date()
      });

      if (request.file) {
        updatedGallery.imageUrl = request.file.path
        updatedGallery.save()
      }

      // Return the updated gallery in the response
      return {
        status: "success",
        code: 200,
        message: 'Gallery updated successfully!',
        data: {
          galleryId: updatedGallery.id,
          title: updatedGallery.title,
          imageUrl: updatedGallery.imageUrl,
          description: updatedGallery.description
        }
      }
    
  } catch (err) {
    console.error(err);
    return {
      status: "Failed", 
      code : 400,
      message : 'Error updating gallery!'
    }
  }
}

async function getById(request){
  
  const { galleryId } = request.params

  try {

    const dbResult = await Galleries.findOne({ where: { id: galleryId } });

    if (!dbResult) {
      return {
        status: "Failed", 
        code : 404,
        message : 'Gallery not found!'
      }
    }

    // Return the mapped galleries in the response
    return {
      status: "success", 
      code : 200,
      message : 'Fetching gallery successfully!',
      data : dbResult
    }
    
  } catch (err) {
    console.error(err);
    return {
      status: "Failed", 
      code : 400,
      message : 'Error fetching gallery!'
    }
  }
}

async function deleteById(request){
  
  const { galleryId } = request.params

  try {

    const dbResult = await Galleries.findOne({ where: { id: galleryId } });

    if (!dbResult) {
      return {
        status: "Failed", 
        code : 404,
        message : 'Gallery not found!'
      }
    }

    // Delete the gallery by ID using the Galleries model
    await dbResult.destroy();

    // Return success message in the response
    return {
      status: "success", 
      code : 200,
      message : 'Gallery deleted successfully!'
    }
    
  } catch (err) {
    console.error(err);
    return {
      status: "Failed", 
      code : 400,
      message : 'Error deleting gallery!'
    }
  }
}

export default {
  getMultiple,
  createGalleries,
  updateGalleriesById,
  getById,
  deleteById
}
