import mongoose from "mongoose";

const waytolearnSchema = new mongoose.Schema({
    title: String,
    description: String,
    card_one: {
        cardtitle: String,
        bulletpoints: [{
            bulletpoint: String
        }]
    },
    card_second: {
        cardtitle: String,
        bulletpoints: [{
            bulletpoint: String
        }]
    },
    card_third: {
        cardtitle: String,
        bulletpoints: [{
            bulletpoint: String
        }]
    },
    card_forth: {
        cardtitle: String,
        bulletpoints: [{
            bulletpoint: String
        }]
    }
}, { timestamps: true });

const waytolearnsectionModel = mongoose.models.waytolearnsection || mongoose.model('waytolearnsection', waytolearnSchema);

export default waytolearnsectionModel;