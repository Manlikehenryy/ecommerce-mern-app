import multer from "multer";

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'frontend/public/uploads/'); // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original file name for the uploaded file
    }
  });
  
  export const upload = multer({ storage: storage });

// upload.fields([{ name: 'file1' }, { name: 'file2' }]) for multiple file
// const file1 = req.files['file1'];
// const file2 = req.files['file2'];


// upload.single('productImage')
// const fileName = req.file.originalname; for single file

