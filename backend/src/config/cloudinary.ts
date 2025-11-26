import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer for file uploads
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.'));
    }
  }
});

// Upload image to Cloudinary
export const uploadToCloudinary = async (
  fileBuffer: Buffer,
  folder: string = 'rentify'
): Promise<{ url: string; publicId: string }> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        transformation: [
          { width: 1200, height: 900, crop: 'limit' },
          { quality: 'auto', fetch_format: 'auto' }
        ]
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Upload failed'));

        resolve({
          url: result.secure_url,
          publicId: result.public_id
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
};

// Delete image from Cloudinary
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  await cloudinary.uploader.destroy(publicId);
};

export default cloudinary;
