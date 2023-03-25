const pool = require("../configs/db.config")

async function getMultiple(query){
  
  const { title, imageUrl, Description } = query;

  try {
    const { rows } = await pool.query('SELECT * FROM galleries');

    // Filter galleries by title if the query parameter exists
    const filteredGalleries = title
    ? rows.filter(gallery => gallery.title.includes(title))
    : rows;

    // Map the galleries to the desired response format
    const galleries = filteredGalleries.map(gallery => ({
      id: gallery.id,
      title: gallery.title,
      imageUrl: gallery.imageurl,
      description: gallery.description,
      createdAt: gallery.createdat,
      updatedAt: gallery.updatedat
    }));

    // Return the mapped galleries in the response
    return {
      status: "success", 
      code : 200,
      message : 'Fetching galleries successfully!',
      data : galleries
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
