import multer from "multer";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public'));
  },
  filename: function (req, file, cb) {
      const name = Date.now() + '-' + file.originalname;
      cb(null, name);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

export default upload;