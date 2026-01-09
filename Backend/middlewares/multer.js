// import multer from "multer";

// const storage = multer.memoryStorage();
// // export const singleUpload = multer({storage}).single("file");
// export const singleUpload = multer({ storage }).fields([
//   { name: "resume", maxCount: 1 },
//   { name: "photo", maxCount: 1 },
// ]);



// import multer from "multer";

// const storage = multer.memoryStorage();

// export const uploadProfilePhoto = multer({ storage }).single("photo");

// export const uploadResume = multer({ storage }).single("resume");

// export const uploadProfileFiles = multer({ storage }).fields([
//   { name: "resume", maxCount: 1 },
//   { name: "photo", maxCount: 1 },
// ]);
// export const singleUpload = uploadProfileFiles;

import multer from "multer";

const storage = multer.memoryStorage();

// For signup (only photo)
export const uploadProfilePhoto = multer({ storage }).single("photo");

// For profile update (resume + photo)
export const uploadProfileFiles = multer({ storage }).fields([
  { name: "resume", maxCount: 1 },
  { name: "photo", maxCount: 1 },
]);
