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

export default {
  getMultiple
}
