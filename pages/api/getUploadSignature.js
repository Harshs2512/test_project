import cloudinary from '../../utils/cloudinary';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    const timestamp = Math.round((new Date).getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request({
        timestamp: timestamp,
        upload_preset: 'vblzgnrs'
    }, process.env.CLOUDINARY_API_SECRET);

    res.status(200).json({
        signature: signature,
        timestamp: timestamp,
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY
    });
}
