import Course from 'models/CourseModel';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }
    const instructorId = req.query.instructorId;
    try {
        const courseCount = await Course.countDocuments({ created_by: instructorId });
        res.status(200).json({ courseCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};