const express = require('express');
const axios = require('axios');
const cors = require('cors'); // CORSライブラリを追加

const app = express();
const port = process.env.PORT || 3000;

// CORS設定
app.use(cors()); // 全てのオリジンを許可（安全性を考慮して必要に応じて制限する）

app.get('/proxy', async (req, res) => {
  const eventId = req.query.event_id;
  const apiUrl = `https://connpass.com/api/v1/event/?event_id=${eventId}`;
  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});

