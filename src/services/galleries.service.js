const { Op } = require('sequelize');
const Galleries = require("../models/galleries.model");

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

module.exports = {
  getMultiple
}
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
