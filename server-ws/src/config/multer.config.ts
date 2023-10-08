import { diskStorage } from 'multer';
import { parse } from 'path';
import { ulid } from 'ulid';

function generateFilename(file: Express.Multer.File) {
  const ext = parse(file.originalname).ext;
  return `${ulid()}${ext}`;
}

export const storage_icons = diskStorage({
  destination: 'public/uploads/icons',
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});
