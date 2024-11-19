import multer from "multer";

const storage = multer.memoryStorage();

export const singleUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
}).single("file");

// Middleware to handle multer errors
export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size is too large. Max limit is 5MB' });
    }
    return res.status(400).json({ message: err.message });
  } else if (err) {
    return res.status(500).json({ message: 'Unknown error occurred during file upload' });
  }
  next();
};