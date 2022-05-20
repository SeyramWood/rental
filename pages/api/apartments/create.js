
import nextConnect from 'next-connect';
import multiparty from 'multiparty'
import multer from 'multer';
import fileUpload from 'express-fileupload';
import { promises as fs } from 'fs';
const path = require('path')
const slugify = require('slugify')
var mv = require('mv');
const formidable = require("formidable");


import { v4 as uuidv4 } from 'uuid';

import Property from '../../../models/property.model';
import dbConnection from '../../../libs/dbConnection';




const handler = nextConnect()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, `/public/properties`);
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuidv4() + '-' + fileName)
  }
});

let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
  }
});

handler.post(upload.array('images', 6), async (req, res, next) => {
    await dbConnection()
    const reqFiles = [];
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push('/properties/' + req.files[i].filename)
    }
    
    const property = await Property.create({...req.body, images:reqFiles})

    res.status(200).json(property)
})


export const config = {
  api: {
    bodyParser: false
  }
}

export default handler
