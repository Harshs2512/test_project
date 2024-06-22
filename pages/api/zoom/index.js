const KJUR = require('jsrsasign');

export default function handler(req, res) {
    const iat = Math.round(new Date().getTime() / 1000);
    const exp = iat + 60 * 60 * 24;

    const header = {
        'alg': 'HS256',
        'typ': 'JWT'
    };

    const payload = {
        sdkKey: process.env.ZOOM_VIDEO_KEY,
        mn: req.body.meetingNumber,
        // mn: '85020818695',
        role: '0',
        iat: iat,
        exp: exp
    }

    const sHeader = JSON.stringify(header);
    const sPayload = JSON.stringify(payload);

    const meetingSignature = KJUR.KJUR.jws.JWS.sign('HS256', sHeader, sPayload, process.env.ZOOM_VIDEO_SECRET);
    return res.json({
        signature: meetingSignature,
        sdkKey: process.env.ZOOM_VIDEO_KEY
    })
}