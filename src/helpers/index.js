import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { createHash } from 'crypto';
import multer from 'multer';
import AWS from 'aws-sdk';
import path from 'path';
import Jimp from 'jimp';
import { Technology } from '../models';

export const successResponse = (req, res, data, code = 200) => res.send({
  code,
  data,
  success: true,
});

export const errorResponse = (
  req,
  res,
  errorMessage = 'Something went wrong',
  code = 500,
  error = {},
) => res.status(code).json({
  code,
  errorMessage,
  error,
  data: null,
  success: false,
});

export const getTimeBetweenDates = (startDate, endDate) => {
  const sDate = new Date(startDate);
  const eDate = new Date(endDate);
  let year = eDate.getFullYear() - sDate.getFullYear();
  let month = eDate.getMonth() - sDate.getMonth();
  if (month < 0) {
    year -= 1;
    month += 11;
  }
  return `${year} years, ${month + 1} months`;
};
export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const isValidTech = async (arr) => {
  let techList = await Technology.findAll(
    {
      attributes: ['techName'],
    },
  );
  techList = techList.map(elem => elem.techName);
  return arr.every(elem => techList.includes(elem));
};

export const encryptPassword = (password) => {
  const encryptedPassword = createHash('md5').update(password).digest('hex');
  return encryptedPassword;
};

export const validateFields = (object, fields) => {
  const errors = [];
  fields.forEach((f) => {
    if (!(object && object[f])) {
      errors.push(f);
    }
  });
  return errors.length ? `${errors.join(', ')} are required fields.` : '';
};

export const generatePassword = () => {
  const length = 8;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0, n = charset.length; i < length; i += 1) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
};

const dest = path.join(__dirname, '..', '..', 'public', 'storage');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const id = uuidv4();
    const uniqueSuffix = `${id}`;
    cb(null, uniqueSuffix);
  },
});
export const upload = multer({ storage });

const storageUpdate = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${req.params.employeeId}`;
    cb(null, uniqueSuffix);
  },
});
export const uploadUpdateAvatar = multer({ storage: storageUpdate });

// eslint-disable-next-line no-shadow
export const deleteFile = async (path) => {
  try {
    await fs.promises.unlink(path);
    return 'file not deleted';
  } catch (error) {
    return 'file deleted successfully';
  }
};

// compress file with Jimp and upload to s3
const compress = async (filePath) => {
  try {
    // console.log(filePath);
    const image = await Jimp.read(filePath);
    image.resize(400, Jimp.AUTO);
    image.quality(60);
    await image.writeAsync(`${filePath}.jpg`);
    return image;
  } catch (error) {
    return error;
  }
};

export const cloudUpload = async (file) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS,
  });
  const { filename, path: filePath } = file;
  try {
    await compress(filePath);
  } catch (error) {
    throw new Error('File compression Error! \n', error);
  }
  // read compressed file from storage.
  let image;
  try {
    image = await fs.promises.readFile(`${filePath}.jpg`);
  } catch (error) {
    throw new Error('File read Error! \n', error);
  }

  s3.upload(
    {
      Bucket: process.env.AWS_S3_BUCKET,
      ACL: 'public-read',
      Key: filename,
      Body: image,
    },
    (err, data) => {
      if (err) {
        // console.log(err);
        deleteFile(`${filePath}.jpg`);
        return err;
      }
      // console.log(data);
      deleteFile(file.path);
      deleteFile(`${filePath}.jpg`);
      return data;
    },
  );
};

// export const retriveImage = (filename) => {
//   const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS,
//   });

//   const params = {
//     Bucket: process.env.AWS_S3_BUCKET,
//     Key: filename,
//   };
//   s3.getObject(params, (err, data) => {
//     if (err) {
//       return err;
//     }
//     const image = `data:image/jpeg;base64,${btoa(data.Body)}`;
//   });
// };
