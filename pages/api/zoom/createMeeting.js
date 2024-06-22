import axios from "axios";
import getToken from "./getToken";

const handler = async (req, res) => {
    if (req.method === "POST") {
        return createMeetings(req, res);
    } else {
        return res.status(400).send({ message: "Method not allowed" });
    }
};

const createMeetings = async (req, res) => {
    const response = await getToken()
    if (response.status == 400) {
        res.status(401).json({ message: 'Unautheried' })
    }
    const token = response.data.access_token;
    const dataformeeting = req.body
    try {
        const { data } = await axios.post('https://api.zoom.us/v2/users/me/meetings/', dataformeeting, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        res.status(200).json(data);
    } catch (error) {
        console.error('Zoom API error:', error);
        res.status(500).json({ error: 'Failed to fetch data from Zoom API' });
    }
}

export default handler;