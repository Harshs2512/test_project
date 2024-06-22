import mongoose from "mongoose";

const pricingplaSchema = new mongoose.Schema({
    title: String,
    description: String,
    card_one: {
        cardtitle: String,
        carddescription: String,
        duration: String,
        lecture: String,
        enrolled: String,
        bulletpointheading: String,
        bulletpoints: [{
            bulletpoint: String
        }]
    },
    card_second: {
        cardtitle: String,
        carddescription: String,
        duration: String,
        lecture: String,
        enrolled: String,
        bulletpointheading: String,
        bulletpoints: [{
            bulletpoint: String
        }]
    }
}, { timestamps: true });

const pricingplansectionModel = mongoose.models.pricingplansection || mongoose.model('pricingplansection', pricingplaSchema);

export default pricingplansectionModel;