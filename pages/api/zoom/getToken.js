import axios from "axios";

const getToken = async (req, res) => {
    try {
        const response = await axios.post('https://zoom.us/oauth/token', null, {
            params: {
                grant_type: 'account_credentials',
                account_id: process.env.ZOOM_ID
            },
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.ZOOM_KEY}:${process.env.ZOOM_SECRET}`).toString('base64')}`
            }
        })
        return response
        // res.status(200).json(response.data);
    }
    catch (error) {
        return error
        // res.json(error);
    }
};

export default getToken;