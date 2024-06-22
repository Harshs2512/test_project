import connectDB from 'db/newdb';
import footerModel from "models/siteSettings/landingPage/footerModel";

const getSociallinkLogo = async (req, res) => {
    await connectDB();
    try {
        const response = await footerModel.findById(req.query.id).select("sociallinks");
        if (response && response.sociallinks) {
            const socialLinksData = response.sociallinks.map(socialLink => ({
                link: socialLink.link,
                logo: {
                    contentType: socialLink.sociallinklogo.contentType,
                    data: socialLink.sociallinklogo.data,
                },
            }));

            res.status(200).send(socialLinksData);
        } else {
            // Handle the case where there are no social links
            res.status(404).send({
                success: false,
                message: "Social links not found",
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while getting social links",
            error,
        });
    }
};

export default getSociallinkLogo;
