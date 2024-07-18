import { HDMI_COMMAND } from "../../utils/constants";

const { exec } = require("child_process");

export default function handler(req, res) {
  exec(HDMI_COMMAND, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
  res.status(200).json()
}
