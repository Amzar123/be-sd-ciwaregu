const db = require('./db.service');
const helper = require('../utils/helper.util');
const config = require('../configs/general.config');
const { v4: uuidv4 } = require('uuid');

const galleries = []

async function getMultiple(page = 1){
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
  
  let status = false;

  if (!title || !imageUrl || !description) {

    return status
  }

  // Generate ID
  // const id = 1;
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

  galleries.push(newGallery)

  // sukses jika array books bertambah
  const isSuccess = galleries.filter((gallery) => gallery.id === id).length > 0;

  // jika sukses = true
  if (isSuccess) {

    status = true;
    return {status, newGallery}
  }

}

module.exports = {
  getMultiple,
  create
}
