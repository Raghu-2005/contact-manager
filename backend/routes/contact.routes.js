const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const controller = require('../controllers/contact.controller');

// Multer storage config for uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('picture'), controller.createContact);
router.get('/', controller.getContacts);
router.get('/deleted', controller.getDeletedContacts);
router.put('/recover/:id', controller.recoverContact);
router.delete('/:id', controller.deleteContact);

module.exports = router;
