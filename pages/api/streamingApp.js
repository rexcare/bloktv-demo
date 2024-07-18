import { STREAM_COMMAND } from "../../utils/constants";
const { exec } = require("child_process");

export default function handler(req, res) {
  exec(STREAM_COMMAND, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return res.status(500).json({ error: stderr });
    }
    console.log(`stdout: ${stdout}`);
    res.status(200).json({ message: 'Streaming App triggered' });
  });
}