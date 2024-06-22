import cloudinary from '../../utils/cloudinary';
import connectDB from '../../db/newdb';
import fs from 'fs';
const formidable = require("formidable");


export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    await connectDB();

    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Error parsing form data:', err);
            return res.status(500).send({ error: 'Error parsing form data' });
        }

        console.log('Files:', files); // Log files to see the structure

        const file = files.file; // Ensure this is the correct field name
        console.log(file[0].filepath)
        if (!file || !file[0].filepath) {
            console.error('File path is missing');
            return res.status(400).send({ error: 'File path is missing' });
        }

        try {
            const filePath = file[0].filepath;
            console.log(filePath)
            const fileStream = fs.createReadStream(filePath);

            const cloudinaryUploadStream = cloudinary.uploader.upload_stream(
                { upload_preset: 'vblzgnrs' },
                (error, result) => {
                    if (error) {
                        console.error('Error uploading to Cloudinary:', error);
                        res.status(500).send({
                            success: false,
                            message: 'Error in uploading to Cloudinary',
                            error: error,
                        });
                    } else {
                        res.status(200).json({ url: result.secure_url });
                    }
                }
            );

            fileStream.pipe(cloudinaryUploadStream);
        } catch (uploadError) {
            console.error('Error uploading to Cloudinary:', uploadError);
            res.status(500).send({
                success: false,
                message: 'Error in uploading to Cloudinary',
                error: uploadError,
            });
        }
    });
}