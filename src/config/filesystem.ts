export async function getStorage() {
  let driver = process.env.STORAGE_DRIVER || 'local';
  let storage: any = {};

  switch (driver) {
    case 'cloudinary':
      const cloudinary = (await import('cloudinary')).v2;

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      storage = cloudinary;
      break;

    case 'gdrive':
      break;

    default:
      driver = 'local';
      break;
  }

  storage.driver = driver;

  return storage;
}
