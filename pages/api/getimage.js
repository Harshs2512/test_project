export default async function handler(req, res) {
    if (req.method === 'GET') {
        const images = [
            'https://res.cloudinary.com/demo/image/upload/sample.jpg',
            'https://res.cloudinary.com/demo/image/upload/sample2.jpg',
        ];
        res.status(200).json({ images });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
