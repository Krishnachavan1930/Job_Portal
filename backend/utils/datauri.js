import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  if (!file) {
    throw new Error("No file provided");
  }

  if (!file.originalname || !file.buffer) {
    throw new Error("Invalid file object: missing originalname or buffer");
  }

  const parser = new DataUriParser();
  const extName = path.extname(file?.originalname || '').toString();
  
  try {
    return parser.format(extName, file.buffer);
  } catch (error) {
    throw new Error(`Failed to parse file: ${error.message}`);
  }
};

export default getDataUri;