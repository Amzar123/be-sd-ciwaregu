import { Op } from 'sequelize';
// import { query } from "../configs/db.config.js";
import { v4 as uuidv4 } from 'uuid';
import { v5 as uuidv5 } from 'uuid';
import { Teachers } from "../models/teachers.model.js";
import { Users } from '../models/users.model.js';

async function getMultiple(query){
  
  const { name, imageUrl, position, email, nuptk } = query;

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
    if (nuptk) {
      whereClause.nuptk = nuptk;
    }
    if (email) {
      whereClause.email = email;
    }

    const dbResult = await Teachers.findAll({ 
      where: whereClause, 
      include: [
        { 
          model: Users, 
          as: 'teachersDetail',
          attributes: ['name', 'email', 'imageUrl'] 
        } 
      ]
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
  const { name, imageUrl, position, email, nuptk } = responseBody;

  // Error handling
  if (!name || !position || !nuptk ) {
    const missingFields = [];

    if (!name) {
      missingFields.push('name');
    }

    if (!position) {
      missingFields.push('position');
    }

    if (!nuptk) {
      missingFields.push('nuptk');
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
    
    // Create new user record using the Users model
    const newUser = await Users.create({
      id: userId,
      name: name,
      email: finalEmail,
      password: "Gurusdciwaregu123",
      imageUrl: finalImageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Create new teacher record using the Teachers model
    const newTeacher = await Teachers.create({
      id: uuidv4(),
      nuptk: nuptk,
      position: position,
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
        nuptk: newTeacher.nuptk,
        position: newTeacher.position,
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
  const { name, imageUrl, position, email, nuptk } = request.body;

  // Error handling
  if (!name || !position || !nuptk || !email) {
      const missingFields = [];

      if (!name) {
        missingFields.push('name');
      }

      if (!position) {
        missingFields.push('position');
      }

      if (!email) {
        missingFields.push('email');
      }

      if (!nuptk) {
        missingFields.push('nuptk');
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
        nuptk: nuptk,
        position: position,
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
          nuptk: updatedTeacher.nuptk,
          position: updatedTeacher.position,
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

export default {
  getMultiple,
  createTeacher,
  updateTeacherById
}