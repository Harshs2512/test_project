import footerModel from "models/siteSettings/landingPage/footerModel";
import connectDB from 'db/newdb';
import fs from "fs";
const formidable = require("formidable");

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    await connectDB();
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const form = new formidable.IncomingForm();

    try {
        form.parse(req, async (err, fields, files) => {

            if (err) {
                return res.status(500).send({ error: "Error parsing form data" });
            }

            const getSingleValueFromArray = (value) => {
                if (Array.isArray(value) && value.length > 0) {
                    return value[0];
                }
                return value;
            };
            const email = getSingleValueFromArray(fields.email);
            const description = getSingleValueFromArray(fields.description);
            const address = getSingleValueFromArray(fields.address);
            const phone = getSingleValueFromArray(fields.phone);
            const playstoreStatus = getSingleValueFromArray(fields.playstore);
            const appstoreStatus = getSingleValueFromArray(fields.appstore);
            const playstoreLink = getSingleValueFromArray(fields.playstorelink);
            const appstoreLink = getSingleValueFromArray(fields.appstorelink);
            const id = getSingleValueFromArray(fields.id);
            // const logo = files.logo;
            // // Check if the email is a valid string
            const existingData = await footerModel.findById(id).select("-logo");
            if (!existingData) {
                return res.status(500).send({ error: "Course not found" });
            }

            if (typeof email !== "string" || email.trim().length === 0) {
                return res.status(500).send({ error: "Invalid email" });
            }

            if (typeof description !== "string" || description.trim().length === 0) {
                return res.status(500).send({ error: "Invalid description" });
            }

            if (typeof address !== "string" || address.trim().length === 0) {
                return res.status(500).send({ error: "Invalid address" });
            }

            const playstore = {
                link: playstoreLink,
                status: playstoreStatus
            }

            const appstore = {
                link: appstoreLink,
                status: appstoreStatus
            }

            const sectionsArray = JSON.parse(fields.section[0]);
            const section = {
                section: sectionsArray.map(section => ({
                    mainlink: section.mainlink,
                    sublink: {
                        title: section.sublink.title,
                        link: section.sublink.link
                    }
                }))
            };

            const socialArray = JSON.parse(fields.sociallinks[0]);
            const newSocialLinks = socialArray.map((section, index) => {
                const logoFile = files[`logo_${index}`] && files[`logo_${index}`][0];
                return {
                    sociallinklogo: logoFile
                        ? {
                            data: Buffer.from(fs.readFileSync(logoFile.filepath)),
                            contentType: logoFile.mimetype,
                        }
                        : null,
                    link: section.link,
                };
            });

            const existingSocialLinks = existingData.sociallinks || [];
            const mergedSocialLinks = existingSocialLinks.map((existingSocialLink, index) => {
                const newSocialLink = newSocialLinks[index] || {};
                return {
                    ...existingSocialLink,
                    ...newSocialLink,
                };
            });

            const socialLinks = {
                socialLinks: mergedSocialLinks,
            };

            socialLinks.socialLinks.forEach((socialLink) => {
                if (socialLink && socialLink.sociallinklogo && socialLink.sociallinklogo.data.length > 1000000) {
                    return res.status(500).send({ error: "Logo should be less than 1mb" });
                }
            });

            existingData.email = email;
            existingData.description = description;
            existingData.address = address;
            existingData.phone = phone;
            existingData.playstore = playstore;
            existingData.appstore = appstore;
            existingData.sociallinks = socialLinks.socialLinks;
            existingData.links = section.section;
            await existingData.save();
            res.status(201).send({
                success: true,
                message: "Post Created Successfully",
                existingData,
            });
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating course",
        });
    }
}