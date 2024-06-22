import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventData: {
    type: Object,
    required: true,
  },
});


module.exports = mongoose.models.Event || mongoose.model('Event', eventSchema)
 