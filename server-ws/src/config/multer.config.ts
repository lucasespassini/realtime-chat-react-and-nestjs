import { diskStorage } from 'multer';
import { parse } from 'path';
import { ulid } from 'ulid';

function generateFilename(file: Express.Multer.File) {
  const fileName = parse(file.originalname).name;
  const ext = parse(file.originalname).ext;
  return `${fileName.replace(/[^a-zA-Z0-9]/g, '')}${ulid().replace(
    /[^a-zA-Z0-9]/g,
    '',
  )}${ext}`;
}

export const storage_icons = diskStorage({
  destination: 'public/uploads/icons',
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});
