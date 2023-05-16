import { Op } from 'sequelize';
// import { query } from "../configs/db.config.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { v5 as uuidv5 } from 'uuid';
import { Teachers } from "../models/teachers.model.js";
import { Users } from '../models/users.model.js';

async function getMultiple(){
  

  try {

    const dbResult = await Teachers.findAll({ 
      include: [
        { 
          model: Users, 
          as: 'teachersDetail',
          attributes: ['name', 'email', 'imageUrl'] 
        } 
      ],
      attributes: ['id', 'jenisPTK']
    });
    

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

async function createTeacher(responseBody) {

  // Get request Body
  const { name, imageUrl, jenisPTK, email } = responseBody;

  // Error handling
  if (!name || !jenisPTK ) {
    const missingFields = [];

    if (!name) {
      missingFields.push('name');
    }

    if (!jenisPTK) {
      missingFields.push('jenisPTK');
    }

    return {
      status: 'Failed',
      code: 400,
      message: `Failed creating teacher. Missing fields: ${missingFields.join(', ')}.`
    };
  }

  try {
    
    const userId = uuidv4();

    // set default imageUrl if empty
    const defaultImageUrl = 'https://i.stack.imgur.com/34AD2.jpg';
    const finalImageUrl = imageUrl || defaultImageUrl;

    // set email if empty
    const shortUuid = uuidv5('mystring', userId).slice(0, 8);
    const defaultEmail = 'tsdc' + shortUuid + '@sdciwaregu.com'
    const finalEmail = email || defaultEmail;

    // hash new password
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash("Gurusdciwaregu123", salt);
    
    // Create new user record using the Users model
    const newUser = await Users.create({
      id: userId,
      name: name,
      email: finalEmail,
      password: hashPass,
      imageUrl: finalImageUrl,
      role: "Teachers",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Create new teacher record using the Teachers model
    const newTeacher = await Teachers.create({
      id: uuidv4(),
      jenisPTK: jenisPTK,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: userId
    });

    // Return the newly created teacher in the response
    return {
      status: 'success',
      code: 201,
      message: 'Teacher created successfully!',
      data: {
        teacherId: newTeacher.id,
        name: newUser.name,
        email: newUser.email,
        jenisPTK: newTeacher.jenisPTK,
        imageUrl: newUser.imageUrl
      }
    };
  } catch (err) {
    console.error(err);
    return {
      status: 'Failed',
      code: 400,
      message: 'Error creating teacher!'
    };
  }
}


async function updateTeacherById(request){

  const { teacherId } = request.params

  // Get request Body
  const { name, imageUrl, jenisPTK, email } = request.body;

  // Error handling
  if (!name || !jenisPTK || !email) {
      const missingFields = [];

      if (!name) {
        missingFields.push('name');
      }

      if (!jenisPTK) {
        missingFields.push('jenisPTK');
      }

      if (!email) {
        missingFields.push('email');
      }

      return {
        status: 'Failed',
        code: 400,
        message: `Failed creating teacher. Missing fields: ${missingFields.join(', ')}.`
      };
    }
    
    try {
      // set default imageUrl if empty
      const defaultImageUrl = 'https://i.stack.imgur.com/34AD2.jpg';
      const finalImageUrl = imageUrl || defaultImageUrl;

      // Find the existing gallery by its id using the Teachers model
      const existingTeacher = await Teachers.findByPk(teacherId);

      // Update the existing gallery record
      const updatedTeacher = await existingTeacher.update({
        jenisPTK: jenisPTK,
        updatedAt: new Date()
      });

      const existingUserTeacher = await Users.findByPk(updatedTeacher.userId);

      const updatedUserTeacher = await existingUserTeacher.update({
        name: name,
        email: email,
        imageUrl: finalImageUrl,
        updatedAt: new Date()
      });

      // Return the updated gallery in the response
      return {
        status: "success",
        code: 200,
        message: 'Teacher updated successfully!',
        data: {
          teacherId: updatedTeacher.id,
          name: updatedUserTeacher.name,
          email: updatedUserTeacher.email,
          jenisPTK: updatedTeacher.jenisPTK,
          imageUrl: updatedUserTeacher.imageUrl,
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

async function getById(request){
  
  const { teacherId } = request.params


  try {


    const dbResult = await Teachers.findOne({ 
      where: { id: teacherId }, 
      include: [
        { 
          model: Users, 
          as: 'teachersDetail',
          attributes: ['name', 'email', 'imageUrl'] 
        } 
      ],
      attributes: ['id', 'jenisPTK']
    });
    

    // Return the mapped Teachers in the response
    return {
      status: "success", 
      code : 200,
      message : 'Fetching teacher successfully!',
      data : dbResult
    }
    
  } catch (err) {
    console.error(err);
    return {
      status: "Failed", 
      code : 400,
      message : 'Error fetching teacher!'
    }
  }
}

async function deleteById(request){
  
  const { teacherId } = request.params

  try {

    const dbResult = await Teachers.findOne({ where: { id: teacherId } });

    const userResult = await Users.findOne({ where: { id: dbResult.userId } });

    if (!dbResult) {
      return {
        status: "Failed", 
        code : 404,
        message : 'Teacher not found!'
      }
    }

    // Delete the gallery by ID using the Galleries model
    await dbResult.destroy();
    await userResult.destroy();

    // Return success message in the response
    return {
      status: "success", 
      code : 200,
      message : 'Teacher deleted successfully!'
    }
    
  } catch (err) {
    console.error(err);
    return {
      status: "Failed", 
      code : 400,
      message : 'Error deleting Teacher!'
    }
  }
}

export default {
  getMultiple,
  createTeacher,
  updateTeacherById,
  getById,
  deleteById
}