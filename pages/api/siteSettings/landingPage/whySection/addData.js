import connectDB from "db/newdb";
import WhyUs from "models/siteSettings/landingPage/whyusModel";

const handler = (req, res) => {
  if (req.method === "POST") {
    return postHandler(req, res);
  } else if (req.method === "GET") {
    return getData(req, res);
  } else if (req.method === "DELETE") {
    return deleteHandler(req, res);
  } else if (req.method === "PUT") {
    return UpdateData(req, res);
  } else {
    return res.status(400).send("Method not allow");
  }
};

const postHandler = async (req, res) => {
  await connectDB();
  try {
    const title = req.body.title;
    const Description = req.body.Description;
    const videoUrl = req.body.videoUrl;
    const data = new WhyUs({
      title: title,
      Description: Description,
      videoUrl: videoUrl,
    });
    await data.save();
    res.status(201).send({
      success: true,
      message: "Created data Successfully",
      data,
    });
  } catch (error) {
    res.status(500).send("Somthing Went Wrong");
  }
};
const getData = async (req, res) => {
  await connectDB();
  try {
    const whyData = await WhyUs.find();

    res.status(200).json({ success: true, whyData });
  } catch (error) {
    console.log(error, "fetching whyData  Error");
    res.status(500).json({ error: "An error occurred while fetching whyData" });
  }
};
const deleteHandler = async (req, res) => {
  const id = req.query.id;
  await connectDB();
  const quiz = await WhyUs.findByIdAndDelete(id);
  if (quiz) {
    return res.status(200).send({ message: "quiz deleted successfully" });
  } else {
    return res.status(404).send({ message: "quiz not found" });
  }
};
const UpdateData = async (req, res) => {
  await connectDB();
  try {
    const existingData = await WhyUs.findById(req.body.id);
    if (!existingData) {
      return res.status(500).send({ message: "Not found" });
    }
    const title = req.body.title;
    const Description = req.body.Description;
    const videoUrl = req.body.videoUrl;
    existingData.title = title;
    existingData.Description = Description;
    existingData.videoUrl = videoUrl;

    await existingData.save();
    res.status(201).json({
      success: true,
      message: "Quiz updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Error in creating quiz",
    });
  }
};
export default handler;
