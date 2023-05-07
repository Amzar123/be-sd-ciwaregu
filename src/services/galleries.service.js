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
