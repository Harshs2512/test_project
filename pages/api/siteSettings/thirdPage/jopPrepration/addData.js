
import JobPrepration from "models/siteSettings/thirdPage/JobPrepGuideMOdel";
import connectDB from 'db/newdb';
const formidable = require("formidable");

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = (req, res) => {
    if (req.method === 'GET') {
        return getHandler(req, res);
    }
    if (req.method === 'POST') {
        return addHandler(req, res);
    }if (req.method === "PUT") {
        return updateHandler(req, res);
    }
    if(req.method == 'DELETE'){
        return deleteHandler(req,res);
    }
    else {
        return res.status(400).send("method not allow")
    }
}


const addHandler = async (req, res) => {
    await connectDB();
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

            const sectionTitle = getSingleValueFromArray(fields.sectionTitle);
            const sectionDescription = getSingleValueFromArray(fields.sectionDescription);
            const course = JSON.parse(fields.course);
           
            const JobPreprationData = new JobPrepration({
                sectionTitle,
                sectionDescription,
                course
            });
            
            await JobPreprationData.save();
            res.status(201).send({
                success: true,
                message: "Career Prep for Accelerated Job Success added",
                JobPreprationData,
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
const updateHandler = async (req, res) => {
    await connectDB();
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

            const { sectionId } = req.query;
            const sectionTitle = getSingleValueFromArray(fields.sectionTitle);
            const sectionDescription = getSingleValueFromArray(fields.sectionDescription);
            const course = JSON.parse(fields.course);
            const existingJobPreprationData = await JobPrepration.findById(sectionId);
            if (!existingJobPreprationData) {
                return res.status(404).send({ message: 'JobPreprationData not found' });
            }
            existingJobPreprationData.sectionTitle = sectionTitle;
            existingJobPreprationData.sectionDescription = sectionDescription;
            existingJobPreprationData.course = course;
            await existingJobPreprationData.save();
            res.status(200).send({
                success: true,
                message: "JobPreprationData updated successfully",
                JobPreprationData: existingJobPreprationData,
            });
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating JobPreprationData",
        });
    }
}

const getHandler = async (req, res) => {
    await connectDB();
    try {
        const records = await JobPrepration.find();
        if (records) {
            res.status(200).json(records)
        } else {
            res.status(404).send({ message: 'No categories found' });
        };
    }
    catch (error) {
        res.status(500).send("Somthing Went Wrong")
    };
};
const deleteHandler = async (req, res) => {
    await connectDB();
    try {
      const { dataId, sectionId } = req.query;
      const prepData = await JobPrepration.findById(sectionId);
      if (!prepData) {
        return res.status(404).send({ message: 'prepData not found' });
      }
      const sectionIndex = prepData.course.findIndex(
        (item) => item._id.toString() === dataId
      );
      if (sectionIndex === -1) {
        return res
          .status(404)
          .send({ message: 'item not found in the prepData' });
      }
      prepData.course.splice(sectionIndex, 1);
      await prepData.save();
      return res.send({ message: 'item deleted successfully', prepData });
    } catch (error) {
      console.error('Error deleting question:', error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  };

export default handler;