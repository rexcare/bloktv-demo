const wifi = require('node-wifi');

wifi.init({
  iface: null
});

export default async function handler(req, res) {
  try {    
    wifi.connect(req.body, () => {
      console.log('Wifi Connected'); 
    });
    res.status(200).json()
  }
  catch (ex) {
    res.status(500).json({ message: ex })
  }
}