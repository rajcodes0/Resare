import multer from "multer";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function(req, file, cb) {  // ✅ FIXED: "filename" not "fileName"
    cb(null, file.originalname);
  }  // ✅ FIXED: Added closing brace
});

export const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }  // ✅ FIXED: Moved limits here
});