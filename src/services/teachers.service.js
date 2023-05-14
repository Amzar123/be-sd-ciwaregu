import { Op } from 'sequelize';
// import { query } from "../configs/db.config.js";
import { v4 as uuidv4 } from 'uuid';
import { Teachers } from "../models/teachers.model.js";

async function getMultiple(query){
  
  const { name, imageUrl, position } = query;

  try {

    const whereClause = {};

    if (name) {
      whereClause.name = {
        [Op.iLike]: `%${name}%`, // use case-insensitive LIKE operator
      };
    }
    if (imageUrl) {
      whereClause.imageUrl = imageUrl;
    }
    if (position) {
      whereClause.position = {
        [Op.iLike]: `%${position}%`, // use case-insensitive LIKE operator
      };
    }

    const dbResult = await Teachers.findAll({ where: whereClause });

    // Return the mapped Teachers in the response
    return {
      status: "success", 
      code : 200,
      message : 'Fetching teachers successfully!',
      data : dbResult
    }
    
  } catch (err) {
    console.error(err);
    return {
      status: "Failed", 
      code : 400,
      message : 'Error fetching teachers!'
    }
  }
}

async function createTeacher(responseBody){

  // Get request Body
  const { name, imageUrl, position } = responseBody
  
  // Error message
  if (!name || !imageUrl || !position) {
    let message = ""
    
      if (!name ) {
        message += ", name"
      }
      
      if (!imageUrl) {

        message += ", imageUrl"
      }

      if (!position) {
        message += ", position"
      }
    
      return { 
        status: 'Failed',
        code: 400,
        message: `Failed creating teacher${message} is empty!`
      }
    }
    
    try {

      // Create new gallery record using the Teachers model
      const newTeacher = await Teachers.create({
        id: uuidv4(),
        name: name,
        imageUrl: imageUrl,
        position: position,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Return the newly created gallery in the response
      return {
        status: "success",
        code: 201,
        message: 'Teacher created successfully!',
        data: {
          teacherId: newTeacher.id,
          name: newTeacher.name,
          position: newTeacher.position,
          imageUrl: newTeacher.imageUrl
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

async function updateTeacherById(request){

  const { teacherId } = request.params

  // Get request Body
  const { name, imageUrl, position } = request.body
  
  // Error message
  if (!name || !imageUrl || !position) {
    let message = ""
    
      if (!name ) {
        message += ", name"
      }
      
      if (!imageUrl) {

        message += ", imageUrl"
      }

      if (!position) {
        message += ", position"
      }
    
      return { 
        status: 'Failed',
        code: 400,
        message: `Failed updating teacher${message} is empty!`
      }
    }
    
    try {

      // Find the existing gallery by its id using the Teachers model
      const existingTeacher = await Teachers.findByPk(teacherId);

      // Update the existing gallery record
      const updatedTeacher = await existingTeacher.update({
        name: name,
        imageUrl: imageUrl,
        position: position,
        updatedAt: new Date()
      });

      // Return the updated gallery in the response
      return {
        status: "success",
        code: 200,
        message: 'Teacher updated successfully!',
        data: {
          teacherId: updatedTeacher.id,
          name: updatedTeacher.name,
          position: updatedTeacher.position,
          imageUrl: updatedTeacher.imageUrl,
        }
      }
    
  } catch (err) {
    console.error(err);
    return {
      status: "Failed", 
      code : 400,
      message : 'Error updating teacher!'
    }
  }
}

export default {
  getMultiple,
  createTeacher,
  updateTeacherById
}