import axios from 'axios';
import FormData from 'form-data';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';

const upload = multer();

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'File upload failed' });
      }

      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Access environment variables for UploadThing API credentials
      const uploadThingEndpoint = 'https://your-uploadThing-endpoint.com/upload';
      const apiKey = process.env.UPLOADTHING_SECRET; // Accessing API key from environment variable

      const formData = new FormData();
      formData.append('image', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      const response = await axios.post(uploadThingEndpoint, formData, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          ...formData.getHeaders(),
        },
      });

      // Upon successful upload to uploadThing, you can handle the response as needed
      console.log('UploadThing Response:', response.data);

      // Return the URL or any necessary data from the uploadThing response
      res.status(200).json({ url: response.data.url });
    });
  } catch (error) {
    console.error('Error uploading to uploadThing:', error.message);
    res.status(500).json({ message: 'Error uploading to uploadThing' });
  }
};

export default handler;
