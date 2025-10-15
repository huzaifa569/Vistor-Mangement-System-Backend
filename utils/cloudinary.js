import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dizxfdmk5',
  api_key: '191371583446354',
  api_secret: 'MHcwEsf8QpR9SteLESDzJ0VrCXI',
});

export const uploadToCloudinary = async (base64, folder = 'contractors') => {
  try {
    const res = await cloudinary.uploader.upload(base64, {
      folder,
      resource_type: 'auto',
    });
    return {
      url: res.secure_url,
      type: res.resource_type,
      name: res.original_filename,
    };
  } catch (error) {
    throw new Error('Cloudinary upload failed: ' + error.message);
  }
};

export default cloudinary;