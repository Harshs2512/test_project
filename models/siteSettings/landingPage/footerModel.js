import mongoose from 'mongoose';

const footerModelSchema = new mongoose.Schema({
    logo: {
        data: Buffer,
        contentType: String,
    },
    description: String,
    email: String,
    phone: String,
    address: String,
    appstore: {
        link: String,
        status: {
            type: String,
            enum: ['true', 'false'],
            default: 'false',
        }
    },
    playstore: {
        link: String,
        status: {
            type: String,
            enum: ['true', 'false'],
            default: 'false',
        }
    },
    
    sociallinks: [{
        link: String,
        sociallinklogo: [{
            data: Buffer,
            contentType: String,
        }],
    }],

    links: [{
        mainlink: String,
        sublink: {
            title: String,
            link: String,
        },
    }],

}, { timestamps: true });

const footerModel = mongoose.models.footerdata || mongoose.model('footerdata', footerModelSchema);

export default footerModel;