import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {                               //his code configures Multer to store uploaded files on your server’s disk.
    cb(null, './public/temporary')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
 export const upload = multer({
    storage,
 })