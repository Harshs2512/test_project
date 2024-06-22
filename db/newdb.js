import mongoose from "mongoose"

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// connecting to database
const connectDB = async () => {
  const connectionUrl = process.env.MONGO_URI
  mongoose
    .connect(connectionUrl, options)
    .then(() => console.log(`Database connected successfully`))
    .catch(err => console.log("Getting Error from DB connection" + err.message))
  mongoose.set("strictQuery", false)
}

export default connectDB
