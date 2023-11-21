import multer from 'multer';

const storage = multer.memoryStorage();
const mulitpleUploadMulter = multer({ storage }).array('files',2);
export default mulitpleUploadMulter;
