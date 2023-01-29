import multer from "multer";
import {v4} from 'uuid';
import path from 'path';

const fileFilter = (req: any, file: any, cb: any) => {
    if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, v4() + path.extname(file.originalname));
    }
});

export default multer({storage});