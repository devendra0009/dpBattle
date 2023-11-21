import multer from 'multer';

const storage = multer.memoryStorage();
const singleUploadMulter = multer({ storage }).single('file');
export default singleUploadMulter;
// const mulitpleUpload = multer({ storage }).array('files',5);
// export default mulitpleUpload;
