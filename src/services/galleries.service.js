const db = require('./db.service');
const helper = require('../utils/helper.util');
const config = require('../configs/general.config');
const { v4: uuidv4 } = require('uuid');

const dataGalleries = []

async function getMultiple(query){
  // const offset = helper.getOffset(page, config.listPerPage);
  // const rows = await db.query(
  //   `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank 
  //   FROM programming_languages LIMIT ?,?`, 
  //   [offset, config.listPerPage]
  // );
  // const data = helper.emptyOrRows(rows);
  // const meta = {page};

  // return {
  //   data,
  //   meta
  // }

  // Check if there is a query parameter for filtering by title
  const { title, imageUrl, description } = query;

  // Filter galleries by title if the query parameter exists
  const filteredGalleries = title
    ? dataGalleries.filter(gallery => gallery.title.includes(title))
    : dataGalleries;

  // Map the galleries to the desired response format
  const galleries = filteredGalleries.map(gallery => ({
    id: gallery.id,
    title: gallery.title,
    imageUrl: gallery.imageUrl,
    description: gallery.description
  }));

  // Return the mapped galleries in the response
  return {
    status: "success", 
    code : 200,
    message : 'Fetching galleries successfully!',
    data : { galleries }
 }
}

async function create(gallery){
  // const result = await db.query(
  //   `INSERT INTO programming_languages 
  //   (name, released_year, githut_rank, pypl_rank, tiobe_rank) 
  //   VALUES 
  //   (?, ?, ?, ?, ?)`, 
  //   [
  //     programmingLanguage.name, programmingLanguage.released_year,
  //     programmingLanguage.githut_rank, programmingLanguage.pypl_rank,
  //     programmingLanguage.tiobe_rank
  //   ]
  // );

  // let message = 'Error in creating gallery';

  // if (result.affectedRows) {
  //   message = 'Gallery created successfully';
  // }

  // return {message};
  
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

  // Create the new gallery object
  const newGallery = {
    id,
    title,
    imageUrl,
    description,
    createdAt,
    updatedAt
  };

  dataGalleries.push(newGallery)

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
}

module.exports = {
  getMultiple,
  create
}
