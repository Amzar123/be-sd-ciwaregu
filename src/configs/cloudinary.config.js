import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from "dotenv";
dotenv.config();

// Configuration 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// Set up multer for handling file uploads
// Configure Multer to use Cloudinary as the storage engine
const storageGalleries = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'galleries' // Specify the desired folder name in Cloudinary
  } 
});

const storageUsers = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'users' // Specify the desired folder name in Cloudinary
  } 
});

const storagePPDB = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ppdb' // Specify the desired folder name in Cloudinary
  } 
});

const uploadGalleries = multer({ storage: storageGalleries });
const uploadUsers = multer({ storage: storageUsers });
const uploadPPDB = multer({ storage: storagePPDB });

export default 
{
  uploadGalleries,
  uploadUsers,
  uploadPPDB
}