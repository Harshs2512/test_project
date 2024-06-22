import connectDB from "db/newdb";
import axios from "axios";

export default async function handler(req, res) {
  await connectDB();
  try {
    const code = req.body.script;
    const language = req.body.language;
    const testCases = req.body.testCases || [];
    const JDoodle_CREDENTIALS = {
      clientId: "ad40e6f37b72e94a671989b3b330c9e6",
      clientSecret:
        "4d6b0b6608127d528a6198437b95973e3a51550c221a480540f294d3f4d5390c",
    };
    for (let testCase of testCases) {
      try {
        const response = await axios.post("https://api.jdoodle.com/v1/execute",
          {
            script: code,
            language: language,
            stdin:testCase.input,
            versionIndex: "0",
            ...JDoodle_CREDENTIALS,
          }
        );
        if (response.data.error) {
          console.error("Error from Jdoodle:", response.data.error);
          break;
        }
        const data = response?.data
        // const result_output = response.data.output ? response.data.output.trim(): "";
        res.status(200).json(data);
      } catch (jdoodleError) {
        console.error("Error requesting Jdoodle API:", jdoodleError);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
    }
  } catch (error) {
    console.error("Error updating results:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
