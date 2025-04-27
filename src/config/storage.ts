require('dotenv').config();

/**
 * File storage configuration
 */
const driver = process.env.STORAGE_DRIVER || 'local';
let storage: any;

switch (driver) {
  case 'cloudinary':
    const cloudinary = require('cloudinary').v2;

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    storage = cloudinary;
    break;
  
  default:
    break;
}

storage.driver = driver;

module.exports = storage;
