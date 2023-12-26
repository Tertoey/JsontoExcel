const axios = require("axios");

async function lineNotify(message) {
    const data = `message=${encodeURIComponent(message)}`
    console.log(data);
    let url = "https://notify-api.line.me/api/notify";
    const token = "uyc4elIwMIGfiL6pCw7Ewszt5zZ1REI7PLBqFf2TbnF"
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`,
      };
      try {
        const response = await axios.post(url, data, { headers });
        console.log(response.data)
        return response.data;
      } catch (error) {
        console.error('Error line:', error.message);
        throw error;
      }
}

module.exports = {
    lineNotify
}