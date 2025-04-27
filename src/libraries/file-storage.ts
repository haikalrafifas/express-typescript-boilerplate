/**
 * Cloud storage library.
 */
const storage = require('@/config/storage');

exports.upload = async (...args: any) => {
  return fileAt[storage.driver].upload(...args);
};

exports.remove = async (...args: any) => {
  return fileAt[storage.driver].remove(...args);
};

exports.update = async (...args: any) => {
  return fileAt[storage.driver].update(...args);
};

const fileAt: any = {
  /**
   * Local disk.
   */
  local: {
    upload: async () => {},

    remove: async () => {},

    update: async () => {},
  },

  /**
   * Cloud - Cloudinary
   */
  cloudinary: {

    upload: async (file: any, directory: string) => {
      return new Promise(async (resolve, reject) => {
        try {
          if (!file || !file.data || file.data.length === 0) {
            return reject(new Error('Invalid or empty file'));
          }
      
          const stream = storage.uploader.upload_stream(
            {
              format: 'webp',
              resource_type: 'image',
              directory,
            },
            (error: any, result: any) => {
              if (error) return reject(new Error(error));
              resolve({
                secure_url: result.secure_url,
                name: file.name,
              });
            },
          );
      
          stream.end(file.data);
        } catch (error) {
          reject(error);
        }
      });
    },

    remove: async (name: string) => {
      const arr = name.split('/');
      const publicId = arr.slice(-2).join('/').replace(/\.[^/.]+$/, '');
    
      return storage.uploader.destroy(publicId, {
        resource_type: 'image',
        invalidate: true,
      });
    },

    update: async (oldPath: string, newFile: any, directory: string) => {
      try {
        if (oldPath) {
          // Delete old file if it exists
          await fileAt.cloudinary.remove(oldPath);
        }
    
        // Upload new file
        const uploadedFile: any = await fileAt.cloudinary.upload(newFile, directory);
        return uploadedFile.secure_url;
      } catch (error: any) {
        throw new Error(`Error updating file: ${error.message}`);
      }
    },

  },
};
